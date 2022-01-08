import { combineReducers } from "redux";
import tasks from "./tasks"
import projects from "./projects"
import tags from "./tags"
import newTask from "./new-task"
import view from "./view"

export default combineReducers({
    newTask,
    projects,
    tags,
    tasks,
    view
});