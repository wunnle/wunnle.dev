import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import ReactMarkdown from 'react-markdown'
import removeMd from 'remove-markdown'

import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import Line from '../../components/Line'
import SEO from '../../components/SEO'
import Sidebar from '../../components/WorkSidebar'
import WorksContext from '../../Works.Context'
import styles from './work.module.css'

const WorkInfo = ({ data, data: { title, website }, content }) => {
  return (
    <Layout>
      <div className={styles.workWrapper}>
        <div className={styles.workInfo}>
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
    </Layout>
  )
}
const Post = () => {
  const {
    query: { wid }
  } = useRouter()

  useEffect(() => {
    console.log('wid changed!')
    setTimeout(() => {
      document.body.classList.add(styles.withAnim)
    }, 0)
  }, [wid])

  const works = useContext(WorksContext)

  const currentIndex = works.findIndex(w => w.slug === wid)

  const {
    document: { data, content },
    images
  } = works.find(w => w.slug === wid)

  const nextWork = works[currentIndex + 1] ? works[currentIndex + 1] : works[0]

  return (
    <>
      <Head>
        <title>{data.title}</title>
      </Head>
      <SEO
        title={data.title}
        description={removeMd(content.trim()).substring(0, 160)}
        image={data.featuredImg}
      />
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
      {/* <NextWork nextSlug={nextWork.slug}>
        <WorkInfo data={nextWork.document.data} content={nextWork.document.content} />
      </NextWork> */}
      <Footer noBorder />
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
    <Link href={src}>
      <a target="_blank" rel="noopener noreferrer">
        <div
          className={[styles.imgContainer, inView ? styles.imgContainerAnim : ''].join(
            ' '
          )}
          ref={ref}
        >
          <img srcSet={`${src} 2x`} alt={alt} />
        </div>
      </a>
    </Link>
  )
}

export default Post
