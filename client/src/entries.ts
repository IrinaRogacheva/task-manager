export type { Task, TaskToDB, Project, Tag, View, App, User }

type Task = {
    id_task: number,
    name: string,
    description: string|null,
    date: Date|null,
    time: string|null,
    priority: number|null,
    id_parent_task: number|null,
    id_project: number|null,
    id_tags: Array<Tag>,
    id_author: number,
    status: number,
}

type TaskToDB = {
    id_task: number,
    name: string,
    description: string | null,
    date: string | null,
    time: string | null,
    priority: number | null,
    id_parent_task: number | null,
    id_project: number | null,
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
    doneTaskTags: Array<Tag>,
    deletedTaskTags: Array<Tag>,
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
    isMultipleTaskSelection: boolean,
    selectedTasks: Array<Task>
}

type App = {
    newTask: Task,
    tasks: Array<Task>,
    projects: Array<Project>,
    view: View,
}

type User = {
    id_user: number,
    loggedIn: boolean,
    email: string
}