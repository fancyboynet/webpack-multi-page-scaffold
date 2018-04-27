import './style.css'
import axios from 'axios'
import hello from 'widget/hello'
import data from './data.json' // import json file
hello()
console.log(data)
// 异步加载
import(/* webpackChunkName: "print" */ './print').then((printMe) => {
  console.log(printMe)
  printMe.default()
})
// 数据模拟
axios.get('/data').then(data => {
  console.log(data)
})
