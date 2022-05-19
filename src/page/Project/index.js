import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Progress, Popover, Spin } from "antd";
import {
  TeamOutlined,
  LoginOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchProject, deleteProject } from "store/action/project";
import { Navigate, useNavigate } from "react-router-dom";
import UpdateProject from "component/ProjectForm/UpdateProject";
import AddProject from "component/ProjectForm/AddProject";

function Project() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selector = useSelector((root) => root);

  const id = selector.Auth.user._id;
  const project = selector.project.data;
  const user = selector.Auth.user.fullName;
  const loading = selector.project.loading;

  const [CreateProjectModal, setCreateProjectModal] = useState(false);
  const [UpdateProjectModal, setUpdateProjectModal] = useState(false);
  const [item, setItem] = useState({});

  const { Meta } = Card;

  const showModal = () => {
    setCreateProjectModal(true);
  };

  const renderProject = () => {
    let projectCard = null;

    projectCard = project.map((item) => (
      <>
        <Card.Grid
          hoverable={false}
          style={{ padding: "10px", width: "320px" }}
          key={item._id}
        >
          <Card
            style={{ width: "100%" }}
            actions={[
              <LoginOutlined
                key="task"
                onClick={() => navigate("/user/tasks", { state: item._id })}
              />,
              <EditOutlined
                key="edit"
                onClick={() => {
                  setUpdateProjectModal(true);
                  setItem(item);
                }}
              />,
              <TeamOutlined key="team" />,
              <DeleteOutlined
                key="delete"
                onClick={() => {
                  dispatch(deleteProject(item));
                }}
              />,
            ]}
          >
            <Meta
              avatar={
                <>
                  <Progress
                    type="circle"
                    percent={item.progress}
                    width={70}
                    status={
                      item.status === "exception" ? "exception" : "active"
                    }
                  />
                </>
              }
              title={item.name}
              description={
                <>
                  <div style={{ textAlign: "left" }}>
                    <p>Created: {item.createdAt?.slice(0, 10)}</p>
                    <p>Author: {user}</p>
                  </div>
                </>
              }
            />
            <div style={{ textAlign: "center" }}>{item.desc}</div>
          </Card>
        </Card.Grid>
      </>
    ));
    return projectCard;
  };

  useEffect(() => {
    if (id !== null && id !== undefined && id !== "") {
      dispatch(fetchProject(id));
    }
  }, [id]);

  return (
    <div>
      <Popover content="Add New Project" trigger="hover">
        <Button
          type="primary"
          icon={<PlusSquareOutlined />}
          onClick={showModal}
        >
          Add New Project
        </Button>
      </Popover>

      <AddProject
        createOn={CreateProjectModal}
        createOff={() => {
          setCreateProjectModal(false);
        }}
      />

      <UpdateProject
        updateOn={UpdateProjectModal}
        updateOff={() => {
          setUpdateProjectModal(false);
          setItem({});
        }}
        item={item}
      />

      {loading === true ? (
        <Spin>
          <div style={{ marginTop: "20px" }}>{renderProject()}</div>
        </Spin>
      ) : (
        <div style={{ marginTop: "20px" }}>{renderProject()}</div>
      )}
    </div>
  );
}

export default Project;
