import { TASK } from "../type/tasks.type";
const initialState = {
  data: [],
  loading: false,
};

const updateTask = (array, newData, id) => {
  let index = -1;
  const currentTask = array;
  index = currentTask.findIndex((arr) => arr._id === id);

  const returnTask = [
    ...currentTask.slice(0, index),
    newData,
    ...currentTask.slice(index + 1),
  ];
  return returnTask;
};

const removeItemByIndex = (array, item) => {
  let index = -1;
  const currentTask = array;
  index = currentTask.findIndex((arr) => arr._id === item._id);

  const returnTask = [
    ...currentTask.slice(0, index),
    ...currentTask.slice(index + 1),
  ];
  return returnTask;
};

export default function tasks(state = initialState, action) {
  switch (action.type) {
    case TASK.TASK_REQUEST:
      return (state = { ...state, loading: true });
    case TASK.TASK_SUCCESS:
      return (state = { data: action.payload.task, loading: false });
    case TASK.TASK_FAIL:
      return { ...state, loading: false };
    case TASK.TASK_CREATE_REQUEST:
      return { ...state, loading: true };
    case TASK.TASK_CREATE_SUCCESS:
      let taskCreate = action.payload.task;
      return { ...state, loading: false, data: [...state.data, taskCreate] };
    case TASK.TASK_CREATE_FAIL:
      return { ...state, loading: false, message: "something wrong !!" };
    case TASK.TASK_DELETE_REQUEST:
      return { ...state, loading: true };
    case TASK.TASK_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: removeItemByIndex(state.data, action.payload.task),
      };
    case TASK.TASK_DELETE_FAIL:
      return { ...state, loading: false, message: "something wrong !!" };
    case TASK.TASK_UPDATE_REQUEST:
      return { ...state, loading: true };
    case TASK.TASK_UPDATE_SUCCESS:
      let { task } = action.payload;
      return {
        ...state,
        loading: false,
        task: updateTask(state.data, task, task.id),
      };
    case TASK.TASK_UPDATE_FAIL:
      return { ...state, loading: false };
    default:
      return initialState;
  }
}
