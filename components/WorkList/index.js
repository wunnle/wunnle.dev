import React, { useContext } from 'react'

import WorksContext from '../../Works.Context'
import Footer from '../Footer'
import Header from '../Header'
import WorkCard from './WorkCard'

const WorkList = () => {
  const works = useContext(WorksContext).sort(
    (a, b) => new Date(b.document.data.date) - new Date(a.document.data.date)
  )

  console.log({ works })

  return (
    <>
      <h1>Recent works</h1>
      {works && works.map((p, i) => <WorkCard key={p.slug} index={i} {...p} />)}
      <Footer />
    </>
  )
}

export default WorkList
