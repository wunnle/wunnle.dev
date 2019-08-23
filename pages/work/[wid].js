import ReactMarkdown from 'react-markdown'
import matter from 'gray-matter';
import styles from './work.module.css'
import Head from 'next/head';



const Post = ({ content, data }) => (
  <>
    <Head>
      <title>{data.title}</title>
      <link href="/static/common.css" rel="stylesheet" />
    </Head>
    <article className={styles.article}>
    {content 
    ?
    <ReactMarkdown source={content}/>
    : 'loading' }
    </article>
   </>
)

Post.getInitialProps = async function ({ query }) {

  const md = await import(`../../works/${query.wid}/index.md`)
  const work = matter(md.default)

  return {
    ...work
  }


}

export default Post