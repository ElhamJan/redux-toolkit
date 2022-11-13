import { configureStore } from "@reduxjs/toolkit";
import CounterReducer from "./counter/CounterSlice";
import todosReducer from "./todos/todosSlice";

export const store = configureStore({
  reducer: {
    counter: CounterReducer,
    todos: todosReducer,
  },
});
