import axios from "axios";
import store from "../store/storeConfig";
import { getCookie } from "./Cookie/GetCookie";

const token = getCookie("token") != null ? getCookie("token") : "";
const instance = axios.create({
  baseURL: "http://todo.truyenmai.com/api",
  headers: {
    Authorization: token ? `Bearer ${token}` : " ",
  },
});

instance.interceptors.request.use(function (config) {
  const { Auth } = store.getState();
  if (Auth.token) {
    config.headers.Authorization = `Bearer ${Auth.token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
