import React, { useState, useMemo } from "react";
import { Card, Input, Button, Row } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../App.css";
import TodoItem from "./TodoItem";

const schema = yup.object({
  title: yup
    .string()
    .required("Please enter the title")
    .min(6, "The length of title must be in range (6-32) characters")
    .max(32, "The length of title must be in range (6-32) characters"),
  description: yup.string().required("Please enter the description"),
});

const TodoListAnt = () => {
  const [todoList, setTodoList] = useState([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleDeleteTask = (index) => {
    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  };

  const handleEditTask = (index, value) => {
    const newTodoList = [...todoList];
    newTodoList.splice(index, 1, value);
    setTodoList(newTodoList);
  };

  const handleAddTask = (value) => {
    setTodoList([value, ...todoList]);
  };

  const renderTodoList = useMemo(() => {
    return todoList.map((todoItem, todoIndex) => {
      return (
        <Row justify="center" style={{ marginTop: 10 }}>
          <TodoItem
            key={todoIndex}
            data={todoItem}
            todoIndex={todoIndex}
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
          />
        </Row>
      );
    });
  }, [todoList]);

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
          <form onSubmit={handleSubmit(handleAddTask)}>
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <Input
                  onChange={(e) => field.onChange(e.target.value)}
                  value={field.value}
                  placeholder="Title"
                />
              )}
            />
            <span className="text-danger">{errors.title?.message}</span>

            <div style={{ margin: "16px 0" }}>
              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <Input
                    onChange={(e) => field.onChange(e.target.value)}
                    value={field.value}
                    placeholder="Description"
                  />
                )}
              />
              <span className="text-danger">{errors.description?.message}</span>
            </div>
            <Button type="primary" htmlType="submit" block>
              Add Task
            </Button>
          </form>
        </Card>
      </Row>
      {renderTodoList}
    </>
  );
};

export default TodoListAnt;
