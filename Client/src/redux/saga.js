import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import * as actions from "./TodoSlice";
function* fetchTodos({ payload }) {
  try {
    const user = yield axios.get(`http://localhost:5000/api/todos`);
    yield put(actions.get_todo_success(user.data));
  } catch (e) {
    console.log(e, "errorrrrr");
  }
}

function* addTodo({ payload }) {
  try {
    const user = yield axios.post(`http://localhost:5000/api/todos`, {
      Description: payload.Description,
    });
    yield put(actions.add_todo_success(user.data));
  } catch (e) {
    console.log(e, "error");
  }
}

function* editTodo({ payload }) {
  console.log("saga", payload);
  try {
    const user = yield axios.put(
      `http://localhost:5000/api/todos/${payload.id}`,
      {
        Description: payload.Description,
      }
    );
    yield put(actions.edit_todo_success(user.data));
  } catch (e) {
    console.log(e, "error");
  }
}

function* deleteTodo({ payload }) {
  try {
    const user = yield axios.delete(
      `http://localhost:5000/api/todos/${payload}`
    );
    yield put(actions.delete_todo_success(user.data));
  } catch (e) {
    console.log(e, "error");
  }
}

function* saga() {
  yield takeLatest(actions.get_todo, fetchTodos);
  yield takeLatest(actions.add_todo, addTodo);
  yield takeLatest(actions.delete_todo, deleteTodo);
  yield takeLatest(actions.edit_todo, editTodo);
}

export default saga;
