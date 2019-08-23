import React from 'react'
import Link from 'next/link';
import getWorks from '../getWorks'
import styles from './home.css'

const Home = ({ pages }) => (
    <div className={styles.home}>
      {console.log}
      <h1>Pages</h1>
      {
        pages.map(p => (
          <Link href={`/work/${p.slug}`} key={p.slug}>
            <a className={styles.pageLink}>
            <h2>{p.slug}</h2>
            <span>{p.document.data.date}</span>
            </a>
          </Link>
        ))
      }
    </div>
  )

Home.getInitialProps = async function () {
  const pages = await getWorks()

  return { pages }
};

export default Home
