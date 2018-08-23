const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const common = require('./webpack.common.js')
const buildConfig = require('./build')
const isCDN = !!process.env.CDN_ENV

module.exports = merge(common, {
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'common'
    },
    runtimeChunk: {
      name: 'runtime'
    },
    minimizer: [
      new UglifyJsPlugin(),
      new OptimizeCssAssetsPlugin({})
    ]
  },
  plugins: [
    new CleanWebpackPlugin(buildConfig.outputName, {
      root: process.cwd()
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
    new MiniCssExtractPlugin({
      filename: `${buildConfig.staticName}/[name].css`,
      chunkFilename: `${buildConfig.staticName}/[name].[chunkhash:7].css`
    })
  ],
  output: {
    publicPath: isCDN ? buildConfig.cdnPublicPath : buildConfig.publicPath,
    filename: `${buildConfig.staticName}/[name].bundle.js`,
    chunkFilename: `${buildConfig.staticName}/[name].[chunkhash:7].bundle.js`,
    path: path.resolve(__dirname, `../${buildConfig.outputName}`)
  }
})
