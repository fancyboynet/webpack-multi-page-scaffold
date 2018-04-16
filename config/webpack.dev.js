const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const mockRouter = require('../mock/router')
const buildConfig = require('./build')

let config = merge(common, {
  mode: 'development',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"development"'
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
    })
  ],
  devtool: 'inline-source-map',
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, `../${buildConfig.outputName}`)
  },
  devServer: {
    contentBase: path.resolve(__dirname, `../${buildConfig.outputName}`),
    hot: false,
    host: 'localhost',
    port: 8081,
    historyApiFallback: true,
    before: mockRouter
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          'css-loader'
        ]
      }
    ]
  }
})

module.exports = config
