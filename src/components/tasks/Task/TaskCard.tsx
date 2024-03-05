import toast from "react-hot-toast";
import { Task, taskCardProps } from "../../../util/types"
import { CiCircleMinus } from "react-icons/ci";
import { useDrag } from 'react-dnd'

const TaskCard = ({ task, setTasks }: taskCardProps) => {

  const [{ isDragging }, drag] = useDrag(() => ({
    // "type" is required. It is used by the "accept" specification of drop targets.
    type: 'task',
    item: { task },
		// The collect function utilizes a "monitor" instance (see the Overview for what this is)
		// to pull important pieces of state from the DnD system.
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  const handleDeleteTask = () => {
    const storedTasks = localStorage.getItem('tasks')
      ? JSON.parse(localStorage.getItem('tasks') as string)
      : [];

    const filteredTasks = storedTasks.filter((storedTask: Task) => {
      return storedTask.id !== task.id;
    });

    setTasks(filteredTasks);
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
    toast.success('Task removed successfully');
  }

  return (
    <div ref={drag} className={`${isDragging ? 'opacity-25' : 'opacity-100'} flex px-3 bg-slate-100 py-2 rounded-md shadow-md shadow-neutral-300 justify-between items-center`}>
      <p>{task.name}</p>
      <button onClick={handleDeleteTask}>
        <CiCircleMinus size={20} className="text-neutral-500 cursor-pointer" />
      </button>
    </div>
  );
}

export default TaskCard;
