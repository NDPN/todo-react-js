import { Layout, Menu, Image } from "antd";
import React from "react";
import { ROUTE } from "../../constant/Route";
import styles from "./TodoSider.module.scss";

function TodoSider() {
  const { Sider } = Layout;

  return (
    <>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="logo">
          {/* <Image
            preview={false}
            src={window.location.origin + "/Img/logo-vl.png"}
          /> */}
          <h1 className={styles.neonText}>P.Nam</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          defaultOpenKeys={["sub1"]}
          items={ROUTE}
        >
          {/* {renderContents(ROUTE)} */}
          {/* <Menu.Item icon={<ArrowLeftOutlined/>} onClick={() => logout()}>Logout</Menu.Item> */}
        </Menu>
      </Sider>
    </>
  );
}

export default TodoSider;
