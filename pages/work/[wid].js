import ReactMarkdown from 'react-markdown'
import matter from 'gray-matter';
import styles from './work.module.css'


const Post = ({ content }) => (
  <article className={styles.article}>
   {content 
   ?
   <ReactMarkdown source={content}/>
   : 'loading' }
   </article>
)

Post.getInitialProps = async function ({ query }) {

  const md = await import(`../../works/${query.wid}.md`)
  const work = matter(md.default)

  return {
    ...work
  }


}

export default Post