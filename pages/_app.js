import App from 'next/app'
import React from 'react'

import getWorks from '../getWorks'
import WorksContext from '../Works.Context'

class MyApp extends App {
  static async getInitialProps(appContext) {
    const appProps = await App.getInitialProps(appContext)
    const works = await getWorks()

    return { ...appProps, works }
  }

  render() {
    const { Component, pageProps, works } = this.props

    return (
      <>
        <WorksContext.Provider value={works}>
          <>
            <Component {...pageProps} />
          </>
        </WorksContext.Provider>
      </>
    )
  }
}

export default MyApp
