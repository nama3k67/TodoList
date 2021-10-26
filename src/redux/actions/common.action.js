import { createAction } from "@reduxjs/toolkit";
import { COMMON_ACTION } from "../constants";

export const getTasksAction = createAction(COMMON_ACTION.GET_TASKS);
export const addTaskAction = createAction(COMMON_ACTION.ADD_TASK);
export const editTaskAction = createAction(COMMON_ACTION.EDIT_TASK);
export const deleteTaskAction = createAction(COMMON_ACTION.DELETE_TASK);
