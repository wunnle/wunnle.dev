import PropTypes from 'prop-types'
import React, { useEffect } from 'react'

import { initGA, logPageView } from '../../utils/analytics'

const Layout = ({ children }) => {
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    logPageView()
  }, [])

  return <>{children}</>
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
