const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const buildConfig = require('./build')
const isDevMode = process.env.NODE_ENV !== 'production'

let srcRoot = path.join(process.cwd(), './src')
let staticRoot = path.join(srcRoot, './static')
let hasStaticRoot = fs.existsSync(staticRoot)
let pageRoot = path.join(srcRoot, './page')
let entry = {}
let plugins = hasStaticRoot ? [
  new CopyWebpackPlugin([ { from: staticRoot, to: `${buildConfig.staticName}` } ])
] : []

let pages = fs.readdirSync(pageRoot)

// 遍历pages目录
pages.map((v, i) => {
  let stat = fs.statSync(path.join(pageRoot, v))
  if (!stat.isDirectory()) {
    return
  }
  entry[v] = `${pageRoot}/${v}/index.js`
  plugins.push(new HtmlWebpackPlugin({
    chunks: ['runtime', 'common', v],
    filename: isDevMode ? `${v}.html` : `${buildConfig.templateName}/${v}.html`,
    template: `${pageRoot}/${v}/index.html`
  }))
})
module.exports = {
  entry: entry,
  plugins: plugins,
  resolve: {
    modules: [srcRoot, "node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf|mp4|webm|ogg|mp3|wav|flac|aac)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: isDevMode ? '[name].[ext]' : `${buildConfig.staticName}/[name].[hash:7].[ext]`
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          isDevMode ? "style-loader": MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-transform-runtime',
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-proposal-object-rest-spread',
            ]
          }
        },
        exclude: /node_modules/
      }
    ]
  }
}
