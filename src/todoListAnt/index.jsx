import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Card, Form, Input, Button, Row } from "antd";

import { addTaskAction } from "../redux/actions";
import TodoItem from "./TodoItem";

const TodoListAnt = () => {
  const { taskList } = useSelector((state) => state.commonReducer);

  const dispatch = useDispatch();

  const renderTodoList = useMemo(() => {
    return taskList.map((item) => {
      return (
        <Row key={item.id} justify="center" style={{ marginTop: 10 }}>
          <TodoItem data={item} />
        </Row>
      );
    });
  }, [taskList]);

  return (
    <>
      <Row justify="center" style={{ marginTop: 20 }}>
        <Card
          hoverable
          style={{ width: 600 }}
          headStyle={{ backgroundColor: "#A2D2FF" }}
          bodyStyle={{ backgroundColor: "#FEF9EF" }}
          title="Add Task"
        >
          <Form
            name="addTask"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            autoComplete="off"
            onFinish={(value) =>
              dispatch(addTaskAction({ id: uuidv4(), ...value }))
            }
          >
            <Form.Item
              label="Title"
              name="title"
              validateFirst
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Please enter the title",
                },
                {
                  min: 6,
                  max: 32,
                  message:
                    "The length of title must be in range (6-32) characters",
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
            <Button type="primary" htmlType="submit" block>
              Add Task
            </Button>
          </Form>
        </Card>
      </Row>
      {renderTodoList}
    </>
  );
};

export default TodoListAnt;
