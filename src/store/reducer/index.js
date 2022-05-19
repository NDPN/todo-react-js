import { combineReducers } from "redux";
import Auth from "./auth";
import project from "./project";
import tasks from "./tasks";

const rootReducer = combineReducers({ Auth, project, tasks });

export default rootReducer;
