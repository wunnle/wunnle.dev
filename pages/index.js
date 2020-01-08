import Head from 'next/head'
import React from 'react'

import Header from '../components/Header'
import WorkList from '../components/WorkList'
import styles from './home.css'

const Home = () => (
  <div className={styles.home}>
    <Head>
      <title>Home</title>
      <link href="/static/common.css" rel="stylesheet" />
    </Head>
    <Header />
    <WorkList />
  </div>
)

export default Home
