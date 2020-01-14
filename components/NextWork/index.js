import { useRouter } from 'next/router'
import { useEffect } from 'react'
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
      router.push(`/work/${nextSlug}`)
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

export default NextWork
