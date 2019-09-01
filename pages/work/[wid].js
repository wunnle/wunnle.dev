import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import ReactMarkdown from 'react-markdown'
import matter from 'gray-matter';
import styles from './work.module.css'
import Head from 'next/head';
import Sidebar from '../../components/WorkSidebar';
import Header from '../../components/Header';


const Post = ({ images, content, data, icons }) => {


  return (<>
    <Head>
      <title>{data.title}</title>
      <link href="/static/common.css" rel="stylesheet" />
    </Head>
    <Header />
    <article className={styles.work}>
      <div className={styles.topInfo}>
        <h1>{data.title}</h1>
        <div className={styles.container}>
          <div className={styles.inner}>
            {content
              ?
              <ReactMarkdown source={content} />
              : 'loading'}
          </div>
          <Sidebar {...data} />
        </div>
      </div>
      <div className={styles.images}>
        <ReactMarkdown source={images.content} renderers={{ image: Img, paragraph: P }} />
      </div>
    </article>
    <NextProject />
  </>)
}

const NextProject = () => {

  const [ref, inView] = useInView({
    threshold: 1,
  })

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
        <span>{gotInView}</span>
        <video muted autoPlay src={gotInView && src}></video>
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
    }
  }


}

export default Post