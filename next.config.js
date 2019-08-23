const withCSS = require('@zeit/next-css')

module.exports = withCSS({
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
})