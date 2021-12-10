import { combineReducers } from "redux";
import tasks from "./tasks";
import newTask from "./new-task"

export default combineReducers({
    newTask,
    tasks
});