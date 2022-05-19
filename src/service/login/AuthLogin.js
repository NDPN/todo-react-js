import axios from "config/axiosconfig";

const api_path = {
  login: "/signin",
};

const AuthLogin = {
  async LoginService(form) {
    return axios.post(api_path.login, form);
  },
};

export default AuthLogin;
