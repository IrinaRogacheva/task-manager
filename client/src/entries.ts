export type { Task, Project, Tag, View, App }

type Task = {
    id_task: number,
    name: string,
    description: string|null,
    date: string|null,
    time: string|null,
    priority: number|null,
    id_parent_task: number|null,
    id_project: number|null,
    id_tags: Array<Tag>,
    id_author: number,
    status: number,
}

type Project = {
    id_project: number,
    name: string,
    color: string,
}

type Tag = {
    id_tag: number,
    name: string,
    color: string,
}

type View = {
    sidebarVisibility: boolean,
    deletedTaskMessageVisibility: boolean,
    doneTaskMessageVisibility: boolean,
    idTaskDone: number,
    idTaskDeleted: number,
    doneTaskIndex: number,
    deletedTaskIndex: number,
    currentTab: string,
    currentTabProjectId: number,
    currentTabTagId: number,
    currentTaskId: number|null,
    countOfIncoming: number,
    countOfToday: number,
    isCreateProject: boolean,
    isCreateTag: boolean,
    isUpdateProject: boolean,
    isUpdateTag: boolean,
    updatingId: number,
}

type App = {
    newTask: Task,
    tasks: Array<Task>,
    projects: Array<Project>,
    view: View,
}