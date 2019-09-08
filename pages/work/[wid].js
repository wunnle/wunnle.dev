import { useEffect, useState, useContext } from 'react'
import { useInView } from 'react-intersection-observer'
import ReactMarkdown from 'react-markdown'
import matter from 'gray-matter';
import styles from './work.module.css'
import Head from 'next/head';
import Sidebar from '../../components/WorkSidebar';
import Header from '../../components/Header';
import Router from 'next/router'
import WorksContext from '../../Works.Context';
import Line from '../../components/Line';
import useScroll from '../../components/hooks/useScroll'


const Post = ({ images, content, data, slug }) => {

  const { scrollY } = useScroll()

  console.log(Math.floor(scrollY / 1.8))

  const works = useContext(WorksContext)
  const currentIndex = works.findIndex(w => w.slug === slug)
  const { slug: nextSlug } = works[currentIndex + 1] ? works[currentIndex + 1] : works[0]

  return (<>
    <Head>
      <title>{data.title}</title>
      <link href="/static/common.css" rel="stylesheet" />
    </Head>
    <Header />
    <article className={styles.work}>
      <div className={styles.titleShadow} style={{ transform: `translateY(${5 + Math.floor(scrollY / 3.2)}px) rotate(90deg)` }}>{data.title}</div>
      <div className={styles.topContainer}>
        <Line />
        <div className={styles.topInfo}>
          <hgroup>
            <h1>{data.title}</h1>
          </hgroup>
          <div className={styles.container}>
            <div className={styles.inner}>
              {content
                ?
                <ReactMarkdown source={content} />
                : 'loading'}
              {
                data.website
                &&
                <a className={styles.websiteLink} href={data.website} target='_blank'>Visit website</a>
              }
            </div>
            <Sidebar {...data} />
          </div>
        </div>
      </div>
      <div className={styles.images}>
        <ReactMarkdown source={images.content} renderers={{ image: Img, paragraph: P }} />
      </div>
    </article>
    <NextWork nextSlug={nextSlug} />
  </>)
}

const NextWork = ({ nextSlug }) => {

  const [ref, inView] = useInView({
    threshold: 1,
    triggerOnce: true
  })

  useEffect(() => {
    if (inView && nextSlug) {
      console.log('will go to ', nextSlug)
      Router.push(`/work/${nextSlug}`)
    }
  }, [inView])

  return (
    <div className={styles.nextProject} ref={ref}>
      Keep scrolling to see the next project
      {inView && <p>&darr;	</p>}
    </div>
  )
}

const P = ({ children }) => {
  if (children && children[0]
    && children.length === 1
    && children[0].props
    && children[0].props.src) { // rendering media without p wrapper

    return children;
  }

  return <p>{children}</p>;
}

const Img = ({ alt, src }) => {

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  if (src.match(/.mp4$/)) {
    return (
      <div className={[styles.imgContainer, inView ? styles.imgContainerAnim : ''].join(' ')} ref={ref}>
        <video muted autoPlay src={inView ? src : ''}></video>
      </div>
    )
  }

  return (
    <div className={[styles.imgContainer, inView ? styles.imgContainerAnim : ''].join(' ')} ref={ref}>
      <img srcSet={`${src} 2x`} src={src} alt={alt} />
    </div>
  )
}

Post.getInitialProps = async function ({ query }) {

  const md = await import(`../../works/${query.wid}/index.md`)
  const imd = await import(`../../works/${query.wid}/images.md`)
  const work = matter(md.default)
  const images = matter(imd.default)

  return {
    ...work,
    images: {
      ...images
    },
    slug: query.wid
  }


}

export default Post