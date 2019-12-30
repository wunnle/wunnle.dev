import React from 'react'
import styles from './WorkCard.module.css' 
import Icon from '../../Icon'

const bgColors = ['#4A2BAF', '#0F61C0', '#9E2B79', '#4146B5']

const WorkCard = (props) => {
  
  const { index, document: { data, data: { title, year, services, tech } }  } = props
  console.log(data)

  return (
  <div className={styles.card} style={{ background: bgColors[index % 4] }}>
      <div className={styles.info}>
        <p className={styles.date}>{year}</p>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.services}>
          {services.split(', ').map((s, i) => <li index={i}>{s}</li>)}
        </div>
        <div className={styles.tech}>
        {
          tech.split(', ').map(t => <div className={styles.techIcon}><Icon white key={t}>{t}</Icon></div>)
        }
        </div>
      </div>
  </div>
)}


export default WorkCard