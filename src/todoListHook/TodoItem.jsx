import { Card, Input, Form, Button, Row } from "antd";
import React, { useState, useMemo } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

const schema = yup.object({
  title: yup
    .string()
    .required("Please enter the title")
    .min(6, "The length of title must be in range (6-32) characters")
    .max(32, "The length of title must be in range (6-32) characters"),
  description: yup.string().required("Please enter the description"),
});

const TodoItem = ({ data, todoIndex, handleDeleteTask, handleEditTask }) => {
  const { Meta } = Card;
  const [isEdit, setIsEdit] = useState(false);
  const [editForm] = Form.useForm();

  const {
    control,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const renderItemViewContent = useMemo(() => {
    return (
      <>
        <Meta title={data.title} description={data.description} />
      </>
    );
  }, [data]);

  const renderItemEditContent = useMemo(() => {
    return (
      <form onSubmit={handleSubmit(handleEditTask)}>
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
        <Button danger onClick={() => handleDeleteTask(todoIndex)}>
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
          onClick={async () => {
            const isValid = await trigger();
            if (isValid) {
              const values = getValues();
              setIsEdit(false);
              handleEditTask(todoIndex, values);
            }
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
        <Button danger onClick={() => handleDeleteTask(todoIndex)}>
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
