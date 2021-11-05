export type {
    Task
}

type Task = {
    id_task: number,
    name: string,
    description: string,
    date: string,
    time: string,
    priority: number,
    id_parent_task: number,
    id_project: number,
    id_author: number,
}
