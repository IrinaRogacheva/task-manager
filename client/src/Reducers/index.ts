import { combineReducers } from "redux";
import tasks from "./tasks";
import newTask from "./new-task"
import view from "./view"

export default combineReducers({
    newTask,
    tasks,
    view
});