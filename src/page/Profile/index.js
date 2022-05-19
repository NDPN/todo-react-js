import React from "react";
import { Row, Col, Menu, Layout, Form, Input, Space, Card } from "antd";
import { useSelector } from "react-redux";

function Profile() {
  const selector = useSelector((root) => root.Auth.user);
  const { email, firstName, fullName, lastName } = selector;

  const { SubMenu } = Menu;
  const { Content } = Layout;

  const renderProfile = () => {
    let xhtml = null;
    xhtml = (
      <>
        <Content>
          <Form
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 100,
            }}
          >
            <Form.Item label="User name">
              <Row>{email}</Row>
            </Form.Item>
            <Form.Item label="Full name">
              <Row>{fullName}</Row>
            </Form.Item>
            <Form.Item label="First name">
              <Row>{firstName}</Row>
            </Form.Item>
            <Form.Item label="Last name">
              <Row>{lastName}</Row>
            </Form.Item>
          </Form>
        </Content>
      </>
    );

    return xhtml;
  };

  return (
    <div>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={6}>
          <Menu mode="inline">
            <SubMenu key="userProfile" title={<h1>User Info</h1>}>
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 80,
                  background: "white",
                }}
              >
                {renderProfile()}
              </Content>
            </SubMenu>
          </Menu>
          <Menu mode="inline">
            <SubMenu key="changePassword" title={<h1>Change Password</h1>}>
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 80,
                  background: "white",
                }}
              >
                <Space direction="vertical">
                  <Input.Password placeholder="Mật khẩu cũ" maxLength />
                  <Input.Password placeholder="Mật khẩu mới" />
                  <Input.Password placeholder="Xác thực mật khẩu" />
                </Space>
              </Content>
            </SubMenu>
          </Menu>
        </Col>
        <Col span={18}>
          <Card
            title={<div style={{ textAlign: "center" }}>hello {fullName}</div>}
            bordered={false}
          >
            <Row>
              <Card.Grid hoverable={false} style={{ width: "50%" }}>
                <Card title="Project cá nhân" bordered={false}></Card>
              </Card.Grid>
              <Card.Grid hoverable={false} style={{ width: "50%" }}>
                <Card title="Project tham gia" bordered={false}></Card>
              </Card.Grid>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Profile;
