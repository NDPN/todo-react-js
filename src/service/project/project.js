import axios from "config/axiosconfig";

const api_path = {
  project: "/initialdata",
  createProject: "/project/create",
  deleteProject: "/project/delete",
  updateProject: "/project/update",
};

const Project = {
  async ProjectService({ id }) {
    return axios.post(api_path.project, { id });
  },
  async CreateProject(form) {
    return axios.post(api_path.createProject, form);
  },
  async DeleteProject(project) {
    return axios.post(api_path.deleteProject, project);
  },
  async UpdateProject(project) {
    return axios.post(api_path.updateProject, project);
  },
};

export default Project;
