const path = require('path')
const webpack = require('webpack')
const CONFIGS = require('./config.json')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { LOCAL_CONFIGS, GOOGLE_CLOUD_STORAGE_CONFIGS } = CONFIGS

module.exports = (env) => {
  const isProduction = env.NODE_ENV === 'production'
  return {
    entry: {
      main: './src/client.js',
    },
    output: {
      filename: isProduction ? '[name].[hash].bundle.js' : '[name].dev.bundle.js',
      path: path.resolve(__dirname, LOCAL_CONFIGS.DIST_PATH),
      publicPath: `/${GOOGLE_CLOUD_STORAGE_CONFIGS.DIST_DIR_NAME}/`,
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
      isProduction ? new webpack.optimize.UglifyJsPlugin() : new webpack.HotModuleReplacementPlugin(),
      // new BundleAnalyzerPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: isProduction ? '"production"' : '"development"',
          BROWSER: true,
        },
      }),
    ],
  }
}

