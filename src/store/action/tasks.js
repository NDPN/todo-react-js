import { TASK } from "../type/tasks.type";
import Tasks from "../../service/tasks/tasks";
import { message } from "antd";

export const fetchTasks = (search) => {
  return async (dispatch) => {
    dispatch({
      type: TASK.TASK_REQUEST,
    });
    return Tasks.TasksService(search)
      .then((res) => {
        if (res.status === 200) {
          const { task } = res.data;
          dispatch({
            type: TASK.TASK_SUCCESS,
            payload: {
              task,
              message: message.success("Your tasks is here !!"),
            },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: TASK.TASK_FAIL,
          payload: {
            message: message.error("Network error, try again !!"),
          },
        });
      });
  };
};

export const createTasks = (form) => {
  return async (dispatch) => {
    dispatch({
      type: TASK.TASK_CREATE_REQUEST,
    });
    return Tasks.CreateTask(form)
      .then((res) => {
        if (res.status === 201) {
          const { task } = res.data;
          dispatch({
            type: TASK.TASK_CREATE_SUCCESS,
            payload: {
              task,
              message: message.success("Added new"),
            },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: TASK.TASK_CREATE_FAIL,
          payload: {
            message: message.error("Oops, have something wrong !!"),
          },
        });
      });
  };
};

export const updateTask = (task) => {
  return async (dispatch) => {
    dispatch({
      type: TASK.TASK_UPDATE_REQUEST,
    });
    return Tasks.UpdateTask(task)
      .then((res) => {
        if (res.status === 201) {
          dispatch({
            type: TASK.TASK_UPDATE_SUCCESS,
            payload: {
              task,
              message: message.success("Update thành công"),
            },
          });
        }
        return true;
      })
      .catch((err) => {
        dispatch({
          type: TASK.TASK_UPDATE_FAIL,
          payload: {
            message: "something wrong !!",
          },
        });
      });
  };
};

export const deleteTask = (task) => {
  return async (dispatch) => {
    dispatch({
      type: TASK.TASK_DELETE_REQUEST,
    });
    return Tasks.DeleteTask(task)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: TASK.TASK_DELETE_SUCCESS,
            payload: {
              task,
              message: message.success("Xóa task thành công"),
            },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: TASK.TASK_DELETE_FAIL,
          payload: {
            message: "something wrong !!",
          },
        });
      });
  };
};
