import Head from 'next/head'
import React from 'react'

import Header from '../components/Header'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import WorkList from '../components/WorkList'
import styles from './home.css'

const Home = () => (
  <Layout>
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
  </Layout>
)

export default Home
