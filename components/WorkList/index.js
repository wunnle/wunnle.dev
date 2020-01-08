import React, { useContext } from 'react'

import WorksContext from '../../Works.Context'
import WorkCard from './WorkCard'

const WorkList = () => {
  const works = useContext(WorksContext)

  return (
    <>
      <h1>Selected works</h1>
      {works && works.map((p, i) => <WorkCard key={p.slug} index={i} {...p} />)}
    </>
  )
}

export default WorkList
