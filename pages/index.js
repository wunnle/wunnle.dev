import React, { createContext, useEffect, useContext } from 'react'
import Link from 'next/link';
import getWorks from '../getWorks'
import styles from './home.css'
import Head from 'next/head';
import Header from '../components/Header';
import WorksContext from '../Works.Context';


const Home = () => {

  const works = useContext(WorksContext)

  return (
    <div className={styles.home}>
      <Head>
        <title>Home</title>
        <link href="/static/common.css" rel="stylesheet" />
      </Head>
      <Header />
      <h1>Selected works</h1>
      {
        works && works.map(p => (
          <Link href={`/work/${p.slug}`} key={p.slug}>
            <a className={styles.pageLink}>
              <h2>{p.document.data.title}</h2>
              <span>{p.document.data.year}</span>
            </a>
          </Link>
        ))
      }
    </div>
  )
}



export default Home
