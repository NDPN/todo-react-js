import { Button, Form, Input, Modal, Select, Slider } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "store/action/project";

function AddProject(props) {
  const { Option } = Select;

  const dispatch = useDispatch();
  const id = useSelector((root) => root.Auth.user._id);

  const handleCreateProject = (form) => {
    const project = {
      userid: id,
      name: form.name,
      desc: form.desc,
      status: form.status,
      progress: form.progress,
      uerAccess: [],
    };
    dispatch(createProject(project));
  };

  return (
    <div>
      <Modal
        title="Add New Project"
        visible={props.createOn}
        onCancel={props.createOff}
        footer={null}
      >
        <Form
          initialValues={{}}
          onFinish={handleCreateProject}
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 100,
          }}
        >
          <Form.Item
            label="Project Name"
            name="name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Project Name" />
          </Form.Item>
          <Form.Item label="Desc" name="desc">
            <Input.TextArea placeholder="Desc" />
          </Form.Item>
          <Form.Item label="Progress" name="progress">
            <Slider step={10} />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Select placeholder="Select a status">
              <Option value="active">Active</Option>
              <Option value="exception">Append</Option>
            </Select>
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => props.createOff()}
          >
            Add new project
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

export default AddProject;
