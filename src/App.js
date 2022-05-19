import { ConfigProvider, Spin } from "antd";
import { useSelector } from "react-redux";
import { BrowserRouter, useRoutes } from "react-router-dom";
import "asset/App.scss";
import { LOGIN_SIDER } from "constant/Route";
import useAuth from "config/CustomHook/useAuth";

const Component = (props) => {
  const route = useRoutes(LOGIN_SIDER(props.auth));
  return route;
};

function App() {
  const auth = useAuth();

  const authReducer = useSelector((root) => root.Auth.authenticating);

  return (
    <div className="App">
      <ConfigProvider>
        <BrowserRouter>
          {authReducer === true ? (
            <Spin>
              <Component auth={auth} />
            </Spin>
          ) : (
            <Component auth={auth} />
          )}
        </BrowserRouter>
      </ConfigProvider>
    </div>
  );
}

export default App;
