const path = require('path')
const config = require('./config')

module.exports = {
  entry: {
    main: './src/client.js',
  },
  output: {
    filename: '[name]-[hash].bundle.js',
    path: config.outputPath
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      static: path.resolve(__dirname, 'static/'),
      helpers: path.resolve(__dirname, 'src/helpers/')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['env', 'stage-0', 'react']
        }
      },
      {
        test: /\.(ttf|eot|otf|svg|png)$/,
        loader: 'file-loader',
        options: {
          emitFile: false,
        },
      },
    ],
  },
}
