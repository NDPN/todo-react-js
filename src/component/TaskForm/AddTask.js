import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Input, Select, Form, Slider, Button } from "antd";
import { createTasks } from "store/action/tasks";

function AddTasks(props) {
  const selector = useSelector((root) => root);
  const location = useLocation();
  const dispatch = useDispatch();

  const user = selector.Auth.user._id;

  const [issue, setIssue] = useState("");

  const { Option } = Select;
  const { state } = location;

  const handleCreate = (values) => {
    const form = {
      project: state,
      userid: user,
      name: values.name,
      desc: values.desc,
      status: values.status,
      progress: values.progress,
      issue: issue,
      id: "",
    };
    dispatch(createTasks(form));
  };

  return (
    <>
      <Form
        onFinish={handleCreate}
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 100,
        }}
      >
        <Form.Item label="Tên tasks" name="name">
          <Input placeholder="Tên tasks" />
        </Form.Item>
        <Form.Item label="Mô tả" name="desc">
          <Input.TextArea placeholder="Mô tả" />
        </Form.Item>
        <Form.Item label="Tiến độ" name="progress">
          <Slider step={10} />
        </Form.Item>
        <Form.Item label="Trạng thái" name="status">
          <Select placeholder="Select a status">
            <Option value={0}>To do</Option>
            <Option value={1}>In progress</Option>
            <Option value={2}>Done</Option>
            <Option value={3}>Pending</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Issue" name="issue" value={issue}>
          <Input.TextArea
            placeholder="Issue"
            onChange={(e) => setIssue(e.target.value)}
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => props.offAddTask()}
        >
          Add task
        </Button>
      </Form>
    </>
  );
}

export default AddTasks;
