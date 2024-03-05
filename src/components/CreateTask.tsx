import React, { ButtonHTMLAttributes, FormEventHandler, SetStateAction, useState } from 'react'
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../util/types';

const CreateTask = ({ setTasks }: { setTasks: React.Dispatch<SetStateAction<Task[]>> }) => {
    const [taskName, setTaskName] = useState('')
    const handleCreateTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setTasks((prev) => {
            const newTasks = [...prev, { name: taskName, id: uuidv4(), status: 'todo' }]
            localStorage.setItem('tasks', JSON.stringify(newTasks))

            return [...prev, { name: taskName, id: uuidv4(), status: 'todo' }]
        })
        toast.success('Task added successfully')
        setTaskName('')
    }
    return (
        <form className='flex space-x-3' onSubmit={(e) => handleCreateTask(e)}>
            <input
                value={taskName}
                type='text'
                className='h-12 w-[300px] bg-slate-100 border-[3px] shadow-md shadow-slate-300  border-slate-400 rounded-md px-2'
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="What needs to be done?"
            />
            <button
                type='submit'
                className='bg-sky-500 text-white font-semibold px-3 rounded-md shadow shadow-sky-800'
            >
                Create
            </button>
        </form>
    )
}

export default CreateTask