import { SetStateAction } from "react";

export type Task = {
  id: string,
  name: string,
  status: 'todo' | 'doing' | 'done',
}

export interface tasksContainerProps {
  tasks: Task[],
  setTasks: React.Dispatch<SetStateAction<Task[]>>,
}
export interface taskCardProps {
  task: Task,
  setTasks: React.Dispatch<SetStateAction<Task[]>>,
}

export interface taskContainerProps extends tasksContainerProps {
  type: 'todo' | 'doing' | 'done'
}
type StatusType = "todo" | "doing" | "done"

export const typeStatus: StatusType[] = ['todo', 'doing', 'done']
