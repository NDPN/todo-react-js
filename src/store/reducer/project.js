import { PROJECT } from "../type/project.type";
const initialState = {
  data: [],
  loading: false,
};

const updateProject = (array, newData, id) => {
  let index = -1;
  const currentProject = array;
  index = currentProject.findIndex((arr) => arr._id === id);

  const returnProject = [
    ...currentProject.slice(0, index),
    newData,
    ...currentProject.slice(index + 1),
  ];
  // console.log("new ", currentProject.slice(index + 1));
  return returnProject;
};

const removeItemByIndex = (array, item) => {
  let index = -1;
  const currentProject = array;
  index = array.findIndex((arr) => arr._id === item._id);

  const returnProject = [
    ...currentProject.slice(0, index),
    ...currentProject.slice(index + 1),
  ];
  return returnProject;
};

export default function project(state = initialState, action) {
  switch (action.type) {
    case PROJECT.PROJECT_REQUEST:
      return { ...state, loading: true };
    case PROJECT.PROJECT_SUCCESS:
      return { ...state, data: action.payload.project, loading: false };
    case PROJECT.PROJECT_FAIL:
      return { ...state, loading: false };
    case PROJECT.PROJECT_CREATE_REQUEST:
      return { ...state, loading: true };
    case PROJECT.PROJECT_CREATE_SUCCESS:
      let projectCreate = action.payload.project;
      return {
        ...state,
        loading: false,
        data: [...state.data, projectCreate],
      };
    case PROJECT.PROJECT_CREATE_FAIL:
      return { ...state, loading: false };
    case PROJECT.PROJECT_EDITING_REQUEST:
      return { ...state, loading: true };
    case PROJECT.PROJECT_EDITING_SUCCESS:
      let { project } = action.payload;
      return {
        ...state,
        loading: false,
        data: updateProject(state.data, project, project._id),
      };
    case PROJECT.PROJECT_EDITING_FAIL:
      return {
        ...state,
        loading: false,
      };
    case PROJECT.PROJECT_DELETE_REQUEST:
      return { ...state, loading: true };
    case PROJECT.PROJECT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: removeItemByIndex(state.data, action.payload.form),
      };
    case PROJECT.PROJECT_DELETE_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
}
