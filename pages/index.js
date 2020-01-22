import Head from 'next/head'
import React from 'react'

import Header from '../components/Header'
import SEO from '../components/SEO'
import WorkList from '../components/WorkList'
import styles from './home.css'

const Home = () => (
  <div>
    <Header />
    <div className={styles.home}>
      <SEO
        title="Wunnle | Portfolio"
        description="Portfolio of Sinan, a web developer and UI/UX designer"
      />
      <WorkList />
    </div>
  </div>
)

export default Home
