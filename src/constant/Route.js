import Home from "../page/Home";
import Login from "../page/Login";
import User from "page/User";
import Logout from "config/Logout/Logout";
import {
  VideoCameraOutlined,
  HomeOutlined,
  SmileOutlined,
  UserOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import Project from "../page/Project";
import Tasks from "../page/Tasks";
import Profile from "../page/Profile";
import { Link, Navigate } from "react-router-dom";
import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";

export const ROUTE = [
  {
    key: "home",
    label: <Link to={"/user/home"}>Home</Link>,
    element: <Home />,
    icon: <SmileOutlined />,
  },
  {
    key: "kehoach",
    label: <Link to={"/user/kehoach"}>Project</Link>,
    element: <Project />,
    icon: <VideoCameraOutlined />,
  },
  {
    key: "profile",
    label: <Link to={"/user/profile"}>Profile</Link>,
    element: <Profile />,
    icon: <UserOutlined />,
  },
  {
    key: "logout",
    label: <Logout />,
    icon: <ArrowLeftOutlined />,
  },
];

export const LOGIN_SIDER = ({ user }) => [
  {
    path: "/user",
    name: "User",
    icon: <SmileOutlined />,
    element: <User user={user} />,
    children:
      user !== "" ? (
        [
          {
            path: "home",
            name: "Trang chủ",
            element: <Home />,
            icon: <SmileOutlined />,
          },
          {
            path: "kehoach",
            name: "Kế hoạch",
            element: <Project />,
            icon: <VideoCameraOutlined />,
          },
          {
            path: "tasks",
            name: "Tasks",
            element: <Tasks />,
          },
          {
            path: "profile",
            name: "Profile",
            element: <Profile />,
          },
        ]
      ) : (
        <Navigate to="/" />
      ),
  },
  {
    title: "Đăng nhập",
    path: "/",
    icon: <HomeOutlined />,
    element: (
      <Layout style={{ background: "#fff", minHeight: "100vh" }}>
        <Content className="site-layout">
          <Login />
        </Content>
      </Layout>
    ),
  },
];
