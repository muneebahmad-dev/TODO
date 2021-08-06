import { createSlice } from "@reduxjs/toolkit";

export const TodoSlice = createSlice({
  name: "todo",
  initialState: {
    todoList: [],
  },
  reducers: {
    get_todo: (state, { payload }) => {
      state.todoList = [...state.todoList];
    },
    get_todo_success: (state, { payload }) => {
      state.todoList = payload;
    },
    add_todo_success: (state, { payload }) => {
      state.todoList = [...state.todoList, payload];
    },
    add_todo: (state, { payload }) => {
      state.todoList = [...state.todoList];
    },
    delete_todo: (state, { payload }) => {
      console.log("delete");
    },
    delete_todo_success: (state, { payload }) => {
      console.log("delete success");
    },
    edit_todo: (state, { payload }) => {
      console.log("edit");
    },
    edit_todo_success: (state, { payload }) => {
      console.log("payload", payload);
    },
  },
});

export const {
  get_todo,
  add_todo,
  get_todo_success,
  add_todo_success,
  edit_todo,
  edit_todo_success,
  delete_todo,
  delete_todo_success,
} = TodoSlice.actions;
export default TodoSlice.reducer;
