import React from 'react'

import Header from '../components/Header'
import Home from '../components/Home'
import Intro from '../components/Intro'
import Layout from '../components/Layout'

const Index = () => (
  <Layout>
    <div>
      <Header />
      <Intro />
      <Home />
    </div>
  </Layout>
)

export default Index
