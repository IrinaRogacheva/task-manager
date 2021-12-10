export type { Task, App }

type Task = {
    id_task: number|null,
    name: string,
    description: string|null,
    date: string|null,
    time: string|null,
    priority: number|null,
    id_parent_task: number|null,
    id_project: number|null,
    id_author: number,
}

type App = {
    newTask: Task,
    tasks: Array<Task>,
    
}