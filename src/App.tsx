import { useState } from 'react'
import './App.css'
import { Toaster } from 'react-hot-toast'
import CreateTask from './components/CreateTask'
import TasksContainer from './components/tasks/TasksContainer'
import { Task } from './util/types'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {

  const storedTasks = localStorage?.getItem('tasks')
  const [tasks, setTasks] = useState<Task[]>(storedTasks ? JSON.parse(storedTasks) : [])

  return (
    <DndProvider backend={HTML5Backend}>

      <Toaster />
      <div className='w-screen space-y-16 h-screen flex flex-col items-center bg-slate-100 pt-16'>
        <CreateTask setTasks={setTasks} />
        <TasksContainer tasks={tasks} setTasks={setTasks} />
      </div>
    </DndProvider>
  )
}

export default App
