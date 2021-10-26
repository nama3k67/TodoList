import React, { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Card, Input, Form, Button, Row } from "antd";

import { deleteTaskAction, editTaskAction } from "../redux/actions";

const TodoItem = ({ data }) => {
  const { Meta } = Card;
  const [isEdit, setIsEdit] = useState(false);
  const [editForm] = Form.useForm();

  const dispatch = useDispatch();

  const renderItemViewContent = useMemo(() => {
    return (
      <>
        <Meta title={data.title} description={data.description} />
      </>
    );
  }, [data]);

  const renderItemEditContent = useMemo(() => {
    return (
      <Form
        form={editForm}
        name="editTask"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{
          title: data.title,
          description: data.description,
        }}
        onFinish={(value) => {
          dispatch(editTaskAction({ id: data.id, ...value }));
          setIsEdit(false);
        }}
      >
        <Form.Item
          label="Title"
          name="title"
          validateFirst
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Please enter your title",
            },
            {
              min: 6,
              max: 32,
              message: "The length of title must be in range [6-32] characters",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Please enter the description",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    );
  }, [data]);

  const renderItemViewHeader = () => {
    return (
      <>
        <Button
          type="primary"
          ghost
          style={{ marginRight: 5 }}
          onClick={() => setIsEdit(true)}
        >
          Edit
        </Button>
        <Button
          danger
          onClick={() => dispatch(deleteTaskAction({ id: data.id }))}
        >
          Delete
        </Button>
      </>
    );
  };

  const renderItemEditHeader = () => {
    return (
      <>
        <Button
          type="primary"
          style={{ marginRight: 5 }}
          onClick={() => {
            editForm.submit(() => {
              setIsEdit(false);
            });
          }}
        >
          OK
        </Button>
        <Button
          type="primary"
          ghost
          style={{ marginRight: 5 }}
          onClick={() => {
            setIsEdit(false);
          }}
        >
          Cancel
        </Button>
        <Button
          danger
          onClick={() => dispatch(deleteTaskAction({ id: data.id }))}
        >
          Delete
        </Button>
      </>
    );
  };

  return (
    <>
      <Card
        hoverable
        title={
          <Row justify="end">
            {isEdit ? renderItemEditHeader() : renderItemViewHeader()}
          </Row>
        }
        style={{ width: 600 }}
        headStyle={{ backgroundColor: "#A2D2FF" }}
        bodyStyle={{ backgroundColor: "#FEF9EF" }}
      >
        {isEdit ? renderItemEditContent : renderItemViewContent}
      </Card>
    </>
  );
};

export default TodoItem;
