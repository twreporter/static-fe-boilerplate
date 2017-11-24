const path = require('path')
const webpack = require('webpack')
const config = require('./config')

module.exports = (env) => {
  const isProduction = env.NODE_ENV === 'production'

  return {
    entry: {
      main: './src/client.js',
    },
    output: {
      filename: isProduction ? '[name].[hash].bundle.js' : '[name].dev.bundle.js',
      path: config.localDistDir,
      publicPath: '/dist/',
    },
    devtool: isProduction ? '' : 'inline-source-map',
    devServer: isProduction ? {} : {
      hot: true,
      host: 'localhost',
      port: 5000,
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          include: path.resolve(__dirname, './src'),
        },
      ],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: isProduction ? '"production"' : '"development"',
        },
      }),
    ],
  }
}

