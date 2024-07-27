import React, { useRef } from 'react'
import './App.less'
import './tailwind.css'
import './test.less'
// 图片不像img那样内嵌式的引入， 要用这种方式引入
import JPG from './assets/1.jpg'
function App() {
  const previewDom = useRef(null)
  const preview = (e: any) => {
    const file = e.target.files[0]
    const dom = previewDom.current
    const fileReader = new FileReader()
    if (file.type === 'image/jpeg' && dom) {
      fileReader.onload = (event) => {
        const res = event.target?.result
        dom.src = res
      }
      fileReader.readAsDataURL(file)
    }
    send(file)
  }
  const send = (file: any) => {
    const formData = new FormData()
    formData.append('file', file)
  }
  return (
    <>
      <div className="">Hello Full-Featured!</div>
      <div className="text-2xl">tailwind-css</div>
      <img className="w-20" src={JPG} alt="" />
      <input type="file" onChange={preview} />
      <div className="preview">
        <img className="w-20" ref={previewDom} src="" alt="" />
      </div>
    </>
  )
}
App.propTypes = {}

export default App
