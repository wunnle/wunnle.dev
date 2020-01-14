import matter from 'gray-matter'
import Head from 'next/head'
import { useContext } from 'react'
import { useInView } from 'react-intersection-observer'
import ReactMarkdown from 'react-markdown'

import Header from '../../components/Header'
import useScroll from '../../components/hooks/useScroll'
import Line from '../../components/Line'
import NextWork from '../../components/NextWork'
import Sidebar from '../../components/WorkSidebar'
import WorksContext from '../../Works.Context'
import styles from './work.module.css'

const WorkInfo = ({ data, data: { title, website }, content }) => (
  <div className={styles.workWrapper}>
    <div className={styles.workInfo}>
      <div className={styles.titleShadow}>{title}</div>
      <div className={styles.topContainer}>
        <Line />
        <div className={styles.topInfo}>
          <hgroup>
            <h1 className={styles.workTitle}>{title}</h1>
          </hgroup>
          <div className={styles.container}>
            <div className={styles.inner}>
              {content ? <ReactMarkdown source={content} /> : 'loading'}
              {website && (
                <a
                  className={styles.websiteLink}
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit website
                </a>
              )}
            </div>
            <Sidebar {...data} />
          </div>
        </div>
      </div>
    </div>
  </div>
)

const Post = ({ images, slug }) => {
  useScroll()

  const works = useContext(WorksContext)
  const currentIndex = works.findIndex(w => w.slug === slug)
  const {
    document: { data, content }
  } = works.find(w => w.slug === slug)

  const nextWork = works[currentIndex + 1] ? works[currentIndex + 1] : works[0]

  console.log(nextWork)

  return (
    <>
      <Head>
        <title>{data.title}</title>
        <link href="/static/common.css" rel="stylesheet" />
      </Head>
      <Header />
      <article className={styles.work}>
        <WorkInfo data={data} content={content} />
        <div className={styles.workImages}>
          <div className={styles.images}>
            <ReactMarkdown
              source={images.content}
              renderers={{ image: Img, paragraph: P }}
            />
          </div>
        </div>
      </article>
      <NextWork nextSlug={nextWork.slug}>
        <WorkInfo data={nextWork.document.data} content={nextWork.document.content} />
      </NextWork>
    </>
  )
}

const P = ({ children }) => {
  if (
    children &&
    children[0] &&
    children.length === 1 &&
    children[0].props &&
    children[0].props.src
  ) {
    // rendering media without p wrapper

    return children
  }

  return <p>{children}</p>
}

const Img = ({ alt, src }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  if (src.match(/.mp4$/)) {
    return (
      <div
        className={[styles.imgContainer, inView ? styles.imgContainerAnim : ''].join(' ')}
        ref={ref}
      >
        <video muted autoPlay src={inView ? src : ''}></video>
      </div>
    )
  }

  return (
    <div
      className={[styles.imgContainer, inView ? styles.imgContainerAnim : ''].join(' ')}
      ref={ref}
    >
      <img srcSet={`${src} 2x`} src={src} alt={alt} />
    </div>
  )
}

Post.getInitialProps = async function({ query }) {
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
