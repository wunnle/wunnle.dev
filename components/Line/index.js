import React from 'react'
import styles from './Line.module.css'
import circle from './circle.svg'

const Line = () => (
  <div className={styles.line}>
    <svg height="10" width="10" className={styles.topCircle}>
      <circle cx="5" cy="5" r="5" fill="#A7B4CF" />
    </svg>

    <svg className={styles.arrow} width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.88851 10.2001C4.01068 10.1953 4.1519 10.145 4.24097 10.0612L7.48792 6.98517C7.70073 6.80556 7.69647 6.46003 7.50467 6.25811C7.31292 6.05618 6.97332 6.0396 6.78296 6.2429L4.40115 8.49654L4.40115 1.48462C4.40115 1.20149 4.17161 0.971943 3.88847 0.971943C3.60532 0.971943 3.37581 1.20149 3.37581 1.48462L3.37581 8.49654L0.993999 6.2429C0.803625 6.03964 0.462584 6.05628 0.270826 6.25828C0.0790676 6.4602 0.0782389 6.81064 0.289069 6.98527L3.53601 10.0613C3.63543 10.1549 3.7514 10.1988 3.88847 10.2002L3.88851 10.2001Z" fill="#0079FF" />
    </svg>


  </div>
)


export default Line