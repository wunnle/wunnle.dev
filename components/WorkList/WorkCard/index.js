import Link from 'next/link'
import PropTypes from 'prop-types'
import React from 'react'

import Icon from '../../Icon'
import styles from './WorkCard.module.css'

const WorkCard = (props) => {
  const {
    slug,
    document: {
      data: { title, date, services, tech, featuredImg, backgroundColor }
    }
  } = props

  return (
    <Link
      href="/work/[wid]"
      as={`/work/${slug}`}
      className={styles.card}
      style={{ backgroundColor }}
    >
      <>
        <div className={styles.info}>
          <p className={styles.date}>{new Date(date).getFullYear()}</p>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.services}>
            {services.split(', ').map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </div>
          <div className={styles.tech}>
            {tech.split(', ').map((t) => (
              <div key={t} className={styles.techIcon}>
                <Icon white>{t}</Icon>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.images}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={featuredImg} alt={title} />
        </div>
      </>
    </Link>
  )
}

WorkCard.propTypes = {
  index: PropTypes.number,
  slug: PropTypes.string,
  document: PropTypes.shape({
    data: {
      title: PropTypes.string,
      year: PropTypes.string,
      services: PropTypes.string,
      tech: PropTypes.string,
      images: PropTypes.string
    }
  })
}

export default WorkCard
