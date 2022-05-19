import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Input, Select, Form, Slider, Button, Modal } from "antd";
import { updateTask } from "store/action/tasks";

function UpdateTask(props) {
  const data = props.data;

  const selector = useSelector((root) => root);
  const location = useLocation();
  const dispatch = useDispatch();
  const formRef = useRef();

  const user = selector.Auth.user._id;

  const [issue, setIssue] = useState("");

  const { Option } = Select;
  const { state } = location;

  const handleUpdate = (values) => {
    const form = {
      project: state,
      userid: user,
      name: values.name,
      desc: values.desc,
      status: values.status,
      progress: values.progress,
      issue: issue,
      id: data._id,
    };
    dispatch(updateTask(form));
  };

  useEffect(() => {
    if (data._id) {
      formRef.current.setFieldsValue(data);
    }
  }, [data._id]);

  return (
    <>
      <Modal
        visible={props.updateOn}
        onCancel={props.updateOff}
        title="Update task"
        footer={null}
      >
        <Form
          onFinish={handleUpdate}
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 100,
          }}
          ref={formRef}
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
            onClick={() => props.updateOff()}
          >
            Update Task
          </Button>
        </Form>
      </Modal>
    </>
  );
}

export default UpdateTask;
