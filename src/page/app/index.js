import './style.css'
import axios from 'axios'
import hello from 'widget/hello'
import data from './data.json' // import json file
import partHtml from './part.html'
console.log(partHtml)
hello()
console.log(data)
// 异步加载
import('./print').then((printMe) => {
  console.log(222, printMe)
  printMe.default()
})
console.log(111)
// 数据模拟
axios.get('/data').then(data => {
  console.log(data)
})
document.querySelector('#part').innerHTML = partHtml
