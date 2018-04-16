const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

let entry = {}
let plugins = []

let pages = fs.readdirSync(path.join(__dirname, '../page'))

// 遍历pages目录
pages.map((v, i) => {
  let stat = fs.statSync(path.join(__dirname, '../page', v))
  if (!stat.isDirectory()) {
    return
  }
  entry[v] = `./page/${v}/index.js`
  plugins.push(new HtmlWebpackPlugin({
    chunks: ['runtime', 'common', v],
    filename: `${v}.html`,
    template: `./page/${v}/index.html`
  }))
})
module.exports = {
  entry: entry,
  plugins: plugins,
  resolve: {
    modules: [process.cwd(), "node_modules"]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'common'
    },
    runtimeChunk: {
      name: 'runtime'
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-syntax-dynamic-import']
          }
        },
        exclude: /node_modules/
      }
    ]
  }
}
