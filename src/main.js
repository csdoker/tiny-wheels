import Tabs from './Tabs'
import Collapse from './Collapse'
import Pager from './Pager'
import Carousel from './Carousel'

import Tree from './Tree'
import treeDatas from './data'

import Calendar from './Calendar'

import '../asset/iconfont/iconfont.css'

// const pager = new Pager(document.querySelector('.pager'))
// console.log(pager.$container)

new Calendar()

new Tabs({
  element: document.querySelector('.tabs'),
  animated: true,
  callback: ($tab, key) => {
    console.log($tab, key)
  }
})

new Collapse({
  element: document.querySelector('.collapse'),
  accordion: false,
  callback: ($item, key, keys) => {
    console.log($item, key, keys)
  }
})

new Pager({
  element: document.querySelector('.pager'),
  total: 200,
  size: 20,
  current: 1,
  callback: number => {
    console.log(number)
  }
})

new Carousel({
  element: document.querySelector('.carousel'),
  height: '200px',
  index: 1,
  interval: 3000,
  autoplay: true
})

new Tree({
  element: document.querySelector('.tree'),
  data: treeDatas,
  multiple: true,
  toggle: node => {
    console.log(node)
  },
  select: (nodes, node) => {
    console.log(nodes, node)
  }
})