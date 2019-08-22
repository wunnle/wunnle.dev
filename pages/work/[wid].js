import { useRouter } from 'next/router'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

const Post = () => {

  const [data, setData] = useState()

  const router = useRouter()
  const { wid } = router.query

  if(wid) {
    try {
      import(`../../works/${wid}.md`)
      .then(data => setData(data.default))
    } catch {
      console.log('err!')
    } 
  }

  return (
    data ? <ReactMarkdown source={data}/> : 'loading'
  )
}

export default Post