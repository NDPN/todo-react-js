import { AUTH } from "../type/auth.type";
import AuthLogin from "../../service/login/AuthLogin";
import axios from "../../config/axiosconfig.js";
import { message } from "antd";
import { getCookie } from "../../config/Cookie/GetCookie";

export const loginAction = (login) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH.LOGIN_REQUEST,
    });
    return AuthLogin.LoginService(login)
      .then((res) => {
        const { token, user } = res.data;
        document.cookie = "token=" + token;
        document.cookie = "user=" + JSON.stringify(user);
        if (res.status === 200) {
          dispatch({
            type: AUTH.LOGIN_SUCCESS,
            payload: {
              token,
              user,
              message: message.success("Đăng nhập thành công"),
            },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: AUTH.LOGIN_FAIL,
          payload: {
            message: message.error("Sai tài khoản hoặc mật khẩu"),
          },
        });
      });
  };
};

export const IsUserLogin = () => {
  return async (dispatch) => {
    dispatch({
      type: AUTH.LOGIN_REQUEST,
    });

    const token = getCookie("token") !== null ? getCookie("token") : "";

    if (token) {
      const res = await axios.post("/auth/required");
      if (res.status === 200) {
        const user = JSON.parse(getCookie("user"));
        dispatch({
          type: AUTH.LOGIN_SUCCESS,
          payload: {
            token,
            user,
          },
        });
        return true;
      } else {
        dispatch({
          type: AUTH.LOGIN_FAIL,
          payload: {
            message: "something wrong!!",
          },
        });
      }
    } else {
      dispatch({
        type: AUTH.LOGIN_FAIL,
        payload: {
          message: "something wrong!!",
        },
      });
    }
  };
};

export const userLogout = () => {
  return async (dispatch) => {
    dispatch({
      type: AUTH.LOGOUT_REQUEST,
    });
    const res = await axios.post("/signout");
    if (res) {
      document.cookie = "user=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      dispatch({
        type: AUTH.LOGOUT_SUCCESS,
      });
    }
  };
};
