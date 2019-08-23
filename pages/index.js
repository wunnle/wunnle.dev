import React from 'react'
import Link from 'next/link';
import getWorks from '../getWorks'
import styles from './home.css'
import Head from 'next/head';


const Home = ({ pages }) => (
    <div className={styles.home}>
      <Head>
        <title>Home</title>
        <link href="/static/common.css" rel="stylesheet" />
      </Head>
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
