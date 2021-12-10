import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import { App } from './entries';
import rootReducer from './Reducers';

const initialState: App = {
  newTask: 
  {
    id_task: null,
    name: "",
    description: null,
    date: null,
    time: null,
    priority: 0,
    id_parent_task: null,
    id_project: null,
    id_author: 1
  }, 
  tasks: []
};

const middleware = [thunk];

export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const selectState = (state: RootState) => state;
export const selectTasks = (state: RootState) => state.tasks;
export const selectNewTask = (state: RootState) => state.newTask;

export default store;