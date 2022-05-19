import axios from "config/axiosconfig";

const api_path = {
  tasks: "/task/search/",
  createTask: "/task/create",
  deleteTask: "/task/delete",
  updateTask: "/task/update",
};

const Tasks = {
  async TasksService(search) {
    return axios.post(api_path.tasks, search);
  },
  async CreateTask(form) {
    return axios.post(api_path.createTask, form);
  },
  async DeleteTask(task) {
    return axios.post(api_path.deleteTask, task);
  },
  async UpdateTask(task) {
    return axios.post(api_path.updateTask, task);
  },
};

export default Tasks;
