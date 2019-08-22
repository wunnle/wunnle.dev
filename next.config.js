// Example next.config.js for adding a loader that depends on babel-loader
// This source was taken from the @next/mdx plugin source:
// https://github.com/zeit/next.js/tree/canary/packages/next-mdx
module.exports = {
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
}