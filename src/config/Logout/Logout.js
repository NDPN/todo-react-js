import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "store/action/auth";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(userLogout()).then(() => navigate("/"));
  };
  return <div onClick={() => logout()}>Logout</div>;
}

export default Logout;
