import React from 'react'
import './App.less'
import './tailwind.css'
import './test.less'
// 图片不像img那样内嵌式的引入， 要用这种方式引入
import JPG from './assets/1.jpg'
function App() {
  console.log(process.env.NODE_ENV)

  return (
    <>
      <div className="">Hello Full-Featured!</div>
      <div className="text-2xl">tailwind-css</div>
      <img className="w-20" src={JPG} alt="" />
      <div className="purgecss">1234556</div>
    </>
  )
}
App.propTypes = {}

export default App
