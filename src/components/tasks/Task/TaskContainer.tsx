import { useDrop } from 'react-dnd'
import { Task, taskContainerProps } from '../../../util/types'
import TaskCard from './TaskCard'
import toast from 'react-hot-toast'

const TaskContainer = ({ tasks, setTasks, type }: taskContainerProps) => {
    const ContainerTasks: Task[] = tasks.filter(task => task.status === type)
    type itemType = {
        task: Task
    }
    // Drag and Drop functionality
    const [{ isOver }, drop] = useDrop(() => ({
        // The type (or types) to accept - strings or symbols
        accept: 'task',
        drop: (item: itemType) => handleDropItem(item.task),
        // Props to collect
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        })
    }))

    const handleDropItem = (task: Task) => {
        if (task.status !== type) {
            setTasks((prev: Task[]) => {
                const newTasks = prev.map((t: Task) => {
                    if (t.id === task.id) {
                        return { ...t, status: type }
                    }
                    return t

                })
                localStorage.setItem('tasks', JSON.stringify(newTasks));
                toast.success(`Successfully moved the task!`)
                return newTasks
            })
        }
    }
    return (
        <div ref={drop} className={`p-3 pb-12 ${isOver && 'bg-slate-200'} rounded-md flex flex-col space-y-8 w-full`}>
            <div className={`${type == 'todo' && 'bg-slate-500'} ${type == 'doing' && 'bg-purple-500'} ${type == 'done' && 'bg-blue-500'} flex space-x-2 items-center h-10 shadow-md shadow-neutral-500 rounded-md px-3 text-white`}>
                <h2>{type}</h2>
                <span className='w-5 bg-white h-5 rounded-full flex justify-center items-center text-black'>
                    {ContainerTasks.length}
                </span>
            </div>
            <div className='w-full flex flex-col space-y-6'>
                {
                    ContainerTasks.map((task: Task) => (
                        <TaskCard key={task.id} task={task} setTasks={setTasks} />
                    ))
                }
            </div>
        </div>
    )
}

export default TaskContainer