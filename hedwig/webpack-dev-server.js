/* eslint no-console:0 */
const webpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')

const config = require('./webpack.config.js')({ NODE_ENV: 'development' })

const options = {
  hot: true,
  host: 'localhost',
  port: 5000,
  stats: {
    colors: true,
  },
}

webpackDevServer.addDevServerEntrypoints(config, options)
const compiler = webpack(config)
const server = new webpackDevServer(compiler, options)

server.listen(5000, 'localhost', () => {
  console.log('dev server listening on port 5000')
})
