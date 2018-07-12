const path = require('path')
const webpack = require('webpack')
const CONFIGS = require('./config.json')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const { LOCAL_CONFIGS, GOOGLE_CLOUD_STORAGE_CONFIGS } = CONFIGS

module.exports = (env) => {
  const isProduction = env.NODE_ENV === 'production'
  const webpackConfig = {
    entry: {
      main: './src/client.js',
    },
    output: {
      filename: isProduction ? '[name].[hash].bundle.js' : '[name].dev.bundle.js',
      path: path.resolve(__dirname, LOCAL_CONFIGS.DIST_PATH),
      publicPath: `/${GOOGLE_CLOUD_STORAGE_CONFIGS.DIST_DIR_NAME}/`,
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
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: isProduction ? '"production"' : '"development"',
        },
      }),
    ],
  }
  if (isProduction) {
    // webpackConfig.plugins.push(new BundleAnalyzerPlugin())
  } else {
    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
    webpackConfig.devtool = 'inline-source-map'
    webpackConfig.devServer = {
      hot: true,
      host: 'localhost',
      port: 5000,
    }
  }
  return webpackConfig
}

