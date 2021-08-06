import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import todoReducer from "../redux/TodoSlice";

import mySaga from "./saga";

const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
const store = createStore(todoReducer, applyMiddleware(sagaMiddleware));

// then run the saga
sagaMiddleware.run(mySaga);

export default store;
