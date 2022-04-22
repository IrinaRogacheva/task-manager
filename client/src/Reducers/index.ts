import { combineReducers } from "redux";
import tasks from "./tasks"
import projects from "./projects"
import tags from "./tags"
import newTask from "./new-task"
import view from "./view"
import user from "./user"
import currentTask from "./current-task"

export default combineReducers({
    newTask,
    projects,
    tags,
    tasks,
    view, 
    user,
    currentTask
});