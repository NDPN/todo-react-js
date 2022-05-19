import React from "react";
import { Navigate } from "react-router-dom";
import { Layout } from "antd";
import TodoSider from "component/TodoSider";

const { Content, Footer } = Layout;

export default function WithAuth(Component, user) {
  return function Authenticated(props) {
    // if (!props.user) {
    //   return <Navigate to="/" />;
    // }

    // const test = !props.user ? true : false;
    // console.log(test);

    if (user) {
      return (
        <Layout style={{ minHeight: "100vh" }}>
          <TodoSider />
          <Layout>
            {/* <Header style={{ backgroundColor: "#f0f2f5", height: "0" }}>
                <Row>
                  <Col span={24} offset="10">
                    <HeaderTodo />
                  </Col>
                </Row>
              </Header> */}
            <Content style={{ padding: "8px" }}>
              <div className="site-layout-background" style={{ padding: 8 }}>
                <Component {...props} />
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>Nam Nguyễn ©2022</Footer>
          </Layout>
        </Layout>
      );
    }
  };
}
