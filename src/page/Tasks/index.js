import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  Card,
  Avatar,
  Progress,
  Modal,
  Space,
  Divider,
  DatePicker,
  Input,
  Select,
  Alert,
  Spin,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  EnterOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask } from "../../store/action/tasks";
import { useLocation, useNavigate } from "react-router-dom";
import UpdateTask from "../../component/TaskForm/UpdateTask";
import AddTasks from "component/TaskForm/AddTask";

function Tasks() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const selector = useSelector((root) => root.tasks.data);

  const loading = useSelector((loading) => loading.tasks.loading);

  const { state } = location;

  const [search, setSearch] = useState({
    search: "",
    project: state,
    status: "",
    date: "",
  });

  console.log(search);

  const [isAddTask, setIsAddTask] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [propsItem, setPropsItem] = useState({});

  const { Meta } = Card;
  const { Option } = Select;

  const handleDeleteTask = (item) => {
    const task = {
      _id: item._id,
      name: item.name,
      desc: item.desc,
      status: item.status,
      progress: item.progress,
      project: state,
    };

    dispatch(deleteTask(task));
  };

  const renderTasks = (arr, index) => {
    let xhtml = null;
    xhtml = arr.map((values) => {
      if (index === values.status) {
        return (
          <>
            <Card
              hoverable
              style={{ width: 280 }}
              actions={[
                <EditOutlined
                  key="edit"
                  onClick={() => {
                    setIsUpdate(true);
                    setPropsItem(values);
                  }}
                />,
                <DeleteOutlined
                  key="delete"
                  onClick={() => {
                    handleDeleteTask(values);
                  }}
                />,
              ]}
            >
              <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={values.name}
                description={
                  <>
                    <p>{values.desc}</p>
                  </>
                }
              />
              <Space
                direction="vertical"
                size="middle"
                style={{ display: "flex" }}
              >
                <Progress percent={values.progress} />
                {values.issue ? (
                  <Alert
                    message="Issue: "
                    description={values.issue}
                    type="error"
                    showIcon
                  />
                ) : null}
              </Space>
            </Card>
          </>
        );
      }
    });
    return xhtml;
  };

  const renderCol = (tasks) => {
    let col = null;
    const arrCol = ["To do", "In progress", "Done", "Pending"];
    col = arrCol.map((item, index) => (
      <>
        <Col className="gutter-row" span={6} key={item}>
          <Space
            split={
              <Divider
                type="vertical"
                style={{ borderWidth: 2, borderColor: "#7cb305" }}
              />
            }
          >
            <Space
              direction="vertical"
              size="large"
              style={{ display: "flex" }}
            >
              <h2>{item}</h2>
              {renderTasks(tasks, index)}
            </Space>
          </Space>
        </Col>
      </>
    ));
    return col;
  };

  useEffect(() => {
    const tasks = search;
    dispatch(fetchTasks(tasks));
  }, []);

  return (
    <div>
      <Row>
        <Col span={6}>
          <Space>
            <Button type="primary" onClick={() => navigate(-1)}>
              <EnterOutlined />
              Back
            </Button>
            <Button type="primary" onClick={() => setIsAddTask(true)}>
              <PlusOutlined />
              Add new
            </Button>
          </Space>

          <Modal
            visible={isAddTask}
            onCancel={() => setIsAddTask(false)}
            title="Add task"
            footer={null}
          >
            <AddTasks offAddTask={() => setIsAddTask(false)} />
          </Modal>
        </Col>
        <Col span={10}>
          <Input
            style={{ width: "40%" }}
            placeholder="Search tasks ..."
            allowClear
            onChange={(e) => setSearch({ ...search, search: e.target.value })}
          />
          <Select defaultValue="Any" style={{ width: "23%" }}>
            <Option value="">Any</Option>
            <Option value={0}>To do</Option>
            <Option value={1}>In progress</Option>
            <Option value={2}>Done</Option>
            <Option value={3}>Pending</Option>
          </Select>
          <DatePicker style={{ width: "30%" }} />
          <Button
            icon={<SearchOutlined />}
            size="middle"
            onClick={() => dispatch(fetchTasks(search))}
          />
        </Col>
        <Col span={1} offset={7}>
          <Avatar src="https://joeschmoe.io/api/v1/random" />
        </Col>
      </Row>

      <UpdateTask
        data={propsItem}
        updateOff={() => setIsUpdate(false)}
        updateOn={isUpdate}
      />

      {loading === true ? (
        <Spin>
          <div style={{ marginTop: "10px" }}>
            <Row gutter={16} style={{ rowGap: "16px" }}>
              {renderCol(selector)}
            </Row>
          </div>
        </Spin>
      ) : (
        <div style={{ marginTop: "10px" }}>
          <Row gutter={16} style={{ rowGap: "16px" }}>
            {renderCol(selector)}
          </Row>
        </div>
      )}
    </div>
  );
}

export default Tasks;
