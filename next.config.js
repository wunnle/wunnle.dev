const withCSS = require('@zeit/next-css')
const withImages = require('next-images')

module.exports = withImages(withCSS({
  cssModules: true,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader'
    })

    if (!options.isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    return config
  },
}))