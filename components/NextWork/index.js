import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

import styles from './NextWork.module.css'

const NextWork = ({ nextSlug, children }) => {
  const router = useRouter()

  const [ref, inView, entry] = useInView({
    threshold: [0, 1]
  })

  const intersectionRatio = entry ? entry.intersectionRatio : null

  useEffect(() => {
    if (intersectionRatio && intersectionRatio > 0.9) {
      document.body.className = ''
      window.scrollTo(0, 0)
      setTimeout(() => {
        router.push('/work/[wid]', `/work/${nextSlug}`, { shallow: true })
      }, 400)
    }
  }, [intersectionRatio, nextSlug, router])

  return (
    <div className={styles.nextProjectContainer}>
      <div className={styles.nextProject}>
        <div className={styles.nextProjectInner}>
          Keep scrolling to see the next project
        </div>
      </div>
      <div
        ref={ref}
        className={styles.nextProjectChildren}
        style={{
          opacity: inView ? entry.intersectionRatio * 0.4 : 0
        }}
      >
        {children}
      </div>
    </div>
  )
}

NextWork.propTypes = {
  nextSlug: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default NextWork
