import { Button, Form, Input, Modal, Select, Slider } from "antd";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchProject, updateProject } from "store/action/project";

const UpdateProject = (props) => {
  const { Option } = Select;
  const { _id, name, desc, status, progress, userOwner } = props.item;
  const formRef = useRef();

  const dispatch = useDispatch();

  const handleUpdate = (values) => {
    const form = {
      id: _id,
      name: values.name,
      desc: values.desc,
      status: values.status,
      progress: values.progress,
      userid: userOwner,
    };

    dispatch(updateProject(form)).then((res) => {
      if (res) {
        dispatch(fetchProject(userOwner));
      }
    });
  };

  useEffect(() => {
    if (_id) {
      formRef.current.setFieldsValue(props.item);
    }
  }, [_id]);

  return (
    <>
      <Modal
        title="Update Project"
        visible={props.updateOn}
        onCancel={props.updateOff}
        footer={null}
      >
        <Form
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 100,
          }}
          ref={formRef}
          initialValues={""}
          onFinish={handleUpdate}
        >
          <Form.Item label="Project Name" name="name">
            <Input placeholder="Update Project Name" />
          </Form.Item>
          <Form.Item label="Desc" name="desc">
            <Input.TextArea placeholder="Update Description" />
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
            onClick={() => props.updateOff()}
          >
            Update project
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateProject;
