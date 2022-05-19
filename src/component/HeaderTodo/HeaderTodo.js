import React from "react";
import { ROUTE } from "constant/Route";
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";

function HeaderTodo() {
  const { pathname } = useLocation();

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>Quản lý công việc</Breadcrumb.Item>
        {ROUTE.map((item, index) => {
          if (item.path === pathname) {
            return (
              <Breadcrumb.Item key={`${item.name}-${index}`}>
                {item.name}
              </Breadcrumb.Item>
            );
          }
        })}
      </Breadcrumb>
    </div>
  );
}

export default HeaderTodo;
