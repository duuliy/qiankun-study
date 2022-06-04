import React from 'react'
import ReactDOM from 'react-dom'
import { registerMicroApps, setDefaultMountApp, start } from 'qiankun';
import App from './App'
import store from './store'

function render() {
  const container = document.getElementById('main-root')
  ReactDOM.render(
    <App />,
    container,
  )
}

render()

//也可以拆开放不同仓库
const microApps = [
  {
    name: 'sub-react',
    // entry: process.env.REACT_APP_SUB_REACT,
    entry:"//localhost:8888/",
    // entry:"//localhost:7789/subapp/sub-react/",
    container: '#subapp-viewport',
    activeRule: '/sub-react',
    props: {
      routerBase: '/sub-react', // 下发基础路由
      getGlobalState: store.getGlobalState // 下发getGlobalState方法
    }
  },
  {
    name: 'sub-html',
    entry: process.env.REACT_APP_SUB_HTML,
    // entry: "//localhost:7799/index.html",
    container: '#subapp-viewport',
    activeRule: '/sub-html',
    props: {
      routerBase: '/sub-html', // 下发基础路由
      getGlobalState: store.getGlobalState // 下发getGlobalState方法
    }
  },
]

registerMicroApps(microApps, {
  beforeLoad: app => {
    console.log('before load app.name=====>>>>>', app.name)
  },
  beforeMount: [
    app => {
      console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
    }
  ],
  afterMount: [
    app => {
      console.log('[LifeCycle] after mount %c%s', 'color: green;', app.name)
    }
  ],
  afterUnmount: [
    app => {
      console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
    }
  ]
})


setDefaultMountApp('/sub-react')
// 启动 qiankun
start()