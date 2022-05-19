import { PROJECT } from "../type/project.type";
import Project from "../../service/project/project";
import { message } from "antd";

export const fetchProject = (id) => {
  return async (dispatch) => {
    dispatch({
      type: PROJECT.PROJECT_REQUEST,
    });
    return Project.ProjectService({ id })
      .then((res) => {
        if (res.status === 200) {
          const { task, project } = res.data;
          dispatch({
            type: PROJECT.PROJECT_SUCCESS,
            payload: {
              task,
              project,
              // message: message.success("Your project is here"),
            },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: PROJECT.PROJECT_FAIL,
          payload: {
            message: message.error("Lỗi network, thử lại sau"),
          },
        });
      });
  };
};

export const createProject = (form) => {
  return async (dispatch) => {
    dispatch({
      type: PROJECT.PROJECT_CREATE_REQUEST,
    });
    return Project.CreateProject(form)
      .then((res) => {
        if (res.status === 201) {
          const { project } = res.data;
          dispatch({
            type: PROJECT.PROJECT_CREATE_SUCCESS,
            payload: {
              project,
              message: message.success("Add new project success"),
            },
          });
        }
      })
      .catch(() =>
        dispatch({
          type: PROJECT.PROJECT_CREATE_FAIL,
          payload: {
            message: message.error("Network error"),
          },
        })
      );
  };
};

export const deleteProject = (form) => {
  return async (dispatch) => {
    dispatch({
      type: PROJECT.PROJECT_DELETE_REQUEST,
    });

    return Project.DeleteProject(form)
      .then((res) => {
        if (res.status === 200) {
          return dispatch({
            type: PROJECT.PROJECT_DELETE_SUCCESS,
            payload: {
              form,
              message: message.success("Delete project success"),
            },
          });
        }
      })
      .catch((err) => {
        return dispatch({
          type: PROJECT.PROJECT_DELETE_FAIL,
          payload: {
            message: message.error("Oops, something wrong"),
          },
        });
      });
  };
};

export const updateProject = (project) => {
  return async (dispatch) => {
    dispatch({
      type: PROJECT.PROJECT_EDITING_REQUEST,
    });
    return Project.UpdateProject(project)
      .then((res) => {
        if (res.status === 201) {
           dispatch({
            type: PROJECT.PROJECT_EDITING_SUCCESS,
            payload: {
              project,
              message: message.success("Update project success"),
            },
          });
          return true
        }
      })
      .catch((err) => {
        return dispatch({
          type: PROJECT.PROJECT_EDITING_FAIL,
          payload: {
            message: message.error("Oops, something wrong"),
          },
        });
      });
  };
};
