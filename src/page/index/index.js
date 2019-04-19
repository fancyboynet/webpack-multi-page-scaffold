import './style.css'
import axios from 'axios'
import hello from 'widget/hello'
import data from './data.json' // import json file
import partHtml from './part.html'
import svgPlay from './play.svg'
hello()
document.querySelector('#json').textContent = JSON.stringify(data)
// 异步加载
import('./print').then((printMe) => {
  printMe.default()
})
// 数据模拟
axios.get('/data').then(data => {
  document.querySelector('#mock').textContent = JSON.stringify(data.data)
})
document.querySelector('#part').innerHTML = partHtml
document.querySelector('#svg').innerHTML = svgPlay
