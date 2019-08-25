import { useRef, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import ReactMarkdown from 'react-markdown'
import matter from 'gray-matter';
import styles from './work.module.css'
import Head from 'next/head';



const Post = ({ images, content, data: { title, website } }) => {


  return (<>
    <Head>
      <title>{title}</title>
      <link href="/static/common.css" rel="stylesheet" />
    </Head>
    <article className={styles.article}>
      <h1>{title}</h1>
      <div className={styles.container}>
        <div className={styles.inner}>
          {content
            ?
            <ReactMarkdown source={content} />
            : 'loading'}
        </div>
        <div className={styles.sidebar}>
          <p><a href={website}>visit website</a></p>
        </div>
      </div>
      <div className={styles.images}>
        <ReactMarkdown source={images.content} renderers={{ image: Img, paragraph: P }} />
      </div>
    </article>
  </>)
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

  const [gotInView, setGotInView] = useState(false)

  const [ref, inView] = useInView({
    threshold: 0,
  })

  useEffect(() => {
    if (inView && !gotInView) {
      setGotInView(true)
    }
  }, [inView])

  console.log({ inView })

  return (
    <div className={[styles.imgContainer, gotInView ? styles.imgContainerAnim : ''].join(' ')} ref={ref}>
      <img src={src} alt={alt} />
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