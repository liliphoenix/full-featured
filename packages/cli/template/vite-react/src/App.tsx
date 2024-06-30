import { useReducer, useState } from 'react'
import './App.css'
import { Button, Input } from 'antd'
import Svg from 'com/Svg'
function App() {
  interface TaskType {
    name?: string
    value?: any
  }
  interface ActionType {
    type: 'add' | 'del'
    name?: string
    value?: any
  }
  const initialData = [
    {
      name: 'A',
      value: '1'
    },
    {
      name: 'B',
      value: '2'
    },
    {
      name: 'C',
      value: '3'
    }
  ]
  const TaskReducer = (tasks: TaskType[], action: ActionType) => {
    switch (action.type) {
      case 'add':
        return [
          ...tasks,
          {
            name: action.name,
            value: action.value
          }
        ]
        break
      case 'del':
        return tasks.filter((item: TaskType) => {
          return item.name !== 'A'
        })
      default: {
        throw Error('未知 action：' + action.type)
      }
    }
  }

  const [tasks, dispatch] = useReducer(TaskReducer, initialData)
  const handleReducerDelete = () => {
    dispatch({
      type: 'del'
    })
  }
  const [list, setList] = useState([
    {
      name: 'Test one',
      finished: true
    }
  ])
  const [content, contentChange] = useState('')
  // 添加
  const addTask = () => {
    setList([
      ...list,
      {
        name: content,
        finished: false
      }
    ])
  }
  // change
  const handleChange = (e: any) => {
    contentChange(e.target.value)
  }
  // 删除
  const deleteFinishedTask = () => {
    setList(
      list.filter((item) => {
        return item.finished !== true
      })
    )
  }
  // 改变任务状态
  const changeState = (e: any, index: any) => {
    setList(
      list.map((item, ind) => {
        if (index == ind) {
          return {
            ...item,
            finished: e.target.checked
          }
        } else {
          return item
        }
      })
    )
  }
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold ">svg Test</h1>
        <div className="flex">
          <Svg name="vite-test1"></Svg>
          <Svg name="vite-test2"></Svg>
          <Svg name="vite-test2"></Svg>
          <Svg name="vite-test1"></Svg>
          <Svg name="vite-test2"></Svg>
          <Svg name="vite-test1"></Svg>
          <Svg name="vite-test2 "></Svg>
        </div>
        <div></div>
      </div>
      <h1 className="text-2xl mb-6 mt-6 font-bold ">TODO State List</h1>
      <div className="flex-col ">
        {list.map((item, index) => {
          return (
            <div>
              <input
                onClick={(e) => changeState(e, index)}
                className="m-2"
                type="checkbox"
                checked={item.finished}
              />
              <div className="text-red-400 font-bold inline-block">
                {item.name}
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-6 flex justify-center">
        <div className="flex">
          <Input onChange={handleChange} className="w-32 mr-3"></Input>
          <Button type="primary" className="mr-6 w-15" onClick={addTask}>
            Add Task
          </Button>
          <Button onClick={deleteFinishedTask} type="dashed">
            Delete Finished Task
          </Button>
        </div>
      </div>
      <h1 className="text-2xl mb-6 mt-6 font-bold ">TODO Reducer List</h1>
      <div className="flex-col ">
        {tasks.map((item: TaskType, index: number) => {
          return (
            <div>
              <input
                onClick={(e) => changeState(e, index)}
                className="m-2"
                type="checkbox"
                checked={item.value}
              />
              <div className="text-red-400 font-bold inline-block">
                {item.name}
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-6 flex justify-center">
        <div className="flex">
          {/* <Input onChange={handleRedChange} className="w-32 mr-3"></Input>
          <Button type="primary" className="mr-6 w-15" onClick={addTask}>
            Add Task
          </Button> */}
          <Button onClick={handleReducerDelete} type="dashed">
            Delete Finished Task
          </Button>
        </div>
      </div>
      <div className="card">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
