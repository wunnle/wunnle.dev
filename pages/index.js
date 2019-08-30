import React from 'react'
import Link from 'next/link';
import getWorks from '../getWorks'
import styles from './home.css'
import Head from 'next/head';
import Header from '../components/Header';


const Home = ({ pages }) => (
  <div className={styles.home}>
    <Head>
      <title>Home</title>
      <link href="/static/common.css" rel="stylesheet" />
    </Head>
    <Header />
    <h1>Selected works</h1>
    {
      pages.map(p => (
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

Home.getInitialProps = async function () {
  const pages = await getWorks()

  return { pages }
};

export default Home
