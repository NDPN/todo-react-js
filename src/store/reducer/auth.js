import { AUTH } from "../type/auth.type";
const initialState = {
  user: "",
  token: "",
  authenticating: false,
};

export default function Auth(state = initialState, action) {
  switch (action.type) {
    case AUTH.LOGIN_REQUEST:
      return { ...state, authenticating: true };
    case AUTH.LOGIN_SUCCESS:
      return {
        user: action.payload.user,
        token: action.payload.token,
        authenticating: false,
      };
    case AUTH.LOGIN_FAIL:
      return {
        ...state,
        authenticating: false,
      };
    case AUTH.LOGOUT_REQUEST:
      return {
        ...state,
        authenticating: true,
      };
    case AUTH.LOGOUT_SUCCESS:
      return {
        ...state,
        user: "",
        token: "",
        authenticating: false,
      };
    default:
      return state;
  }
}
