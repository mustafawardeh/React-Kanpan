import { tasksContainerProps, typeStatus } from "../../util/types"
import TaskContainer from "./Task/TaskContainer"


const TasksContainer = ({ tasks, setTasks }: tasksContainerProps) => {

    return (
        <div className="grid grid-cols-3 px-12 justify-evenly w-full">
            {
                typeStatus.map((type, index) => (
                    <div key={index}
                        className="flex flex-col">
                        <TaskContainer
                            type={type}
                            tasks={tasks}
                            setTasks={setTasks}
                        />
                    </div>
                ))
            }
        </div>
    )
}

export default TasksContainer