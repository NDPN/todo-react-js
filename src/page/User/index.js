import WithAuth from "component/HOC/WithAuth";
import React from "react";
import { Outlet } from "react-router-dom";

function User() {

  return <Outlet />;
}

export default WithAuth(User, "user");
