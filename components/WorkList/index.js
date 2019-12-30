import React, { useContext } from 'react'
import WorksContext from '../../Works.Context'
import Link from 'next/link'
import styles from './WorkList.module.css'
import WorkCard from './WorkCard'

const WorkList = () => {

  const works = useContext(WorksContext)


  console.log({  works })

  return (
    <>
    <h1>Selected works</h1>
    {
      works && works.map((p, i) => (
        <WorkCard key={p.slug} index={i} {...p} />
        // <Link href={`/work/${p.slug}`} key={p.slug}>
        //   <a className={styles.pageLink}>
        //     <h2>{p.document.data.title}</h2>
        //     <span>{p.document.data.year}</span>
        //   </a>
        // </Link>
      ))
    }
    </>
  )
}

export default WorkList

