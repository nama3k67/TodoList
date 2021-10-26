import { createReducer } from "@reduxjs/toolkit";
import { COMMON_ACTION } from "../constants";

const initialState = {
  taskList: [],
};

const commonReducer = createReducer(initialState, {
  [COMMON_ACTION.ADD_TASK]: (state, action) => {
    const newTaskList = [action.payload, ...state.taskList];
    return { ...state, taskList: newTaskList };
  },
  [COMMON_ACTION.EDIT_TASK]: (state, action) => {
    const { id } = action.payload;
    const newTaskList = [...state.taskList];
    const taskIndex = newTaskList.findIndex((item) => item.id === id);

    newTaskList.splice(taskIndex, 1, action.payload);
    return { ...state, taskList: newTaskList };
  },
  [COMMON_ACTION.DELETE_TASK]: (state, action) => {
    const { id } = action.payload;
    const newTaskList = [...state.taskList];
    const taskIndex = newTaskList.findIndex((item) => item.id === id);

    newTaskList.splice(taskIndex, 1);
    return { ...state, taskList: newTaskList };
  },
});

export default commonReducer;
