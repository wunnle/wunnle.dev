import React, { createContext, useEffect, useContext } from 'react'
import Link from 'next/link';
import getWorks from '../getWorks'
import styles from './home.css'
import Head from 'next/head';
import Header from '../components/Header';
import WorksContext from '../Works.Context';
import WorkList from '../components/WorkList';


const Home = () => {

  const works = useContext(WorksContext)

  return (
    <div className={styles.home}>
      <Head>
        <title>Home</title>
        <link href="/static/common.css" rel="stylesheet" />
      </Head>
      <Header />
      <WorkList />
    </div>
  )
}



export default Home
