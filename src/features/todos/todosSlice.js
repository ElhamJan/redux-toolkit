import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAsyncTodos = createAsyncThunk(
  "todos/getAsyncTodos",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:3001/todoItems");
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addAsyncTodos = createAsyncThunk(
  "todos/addAsyncTodos",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:3001/todoItems", {
        id: Date.now(),
        title: payload.title,
        completed: false,
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const toggleAsyncTodos = createAsyncThunk(
  "todos/toggleAsyncTodos",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `http://localhost:3001/todoItems/${payload.id}`,
        {
          completed: payload.completed,
          title: payload.title,
        }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteAsyncTodos = createAsyncThunk(
  "todos/deleteAsyncTodos",
  async (payload, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:3001/todoItems/${payload.id}`);

      return { id: payload.id };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  todoItems: [],
  loading: false,
  error: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        completed: false,
      };

      state.todoItems.push(newTodo);
    },
    toggleTodos: (state, action) => {
      const selectedTodo = state.todoItems.find(
        (t) => t.id === action.payload.id
      );

      selectedTodo.completed = !selectedTodo.completed;
    },
    deleteTodo: (state, action) => {
      const filteredTodos = state.todoItems.filter(
        (t) => t.id !== action.payload.id
      );

      state.todoItems = filteredTodos;
    },
  },
  extraReducers: {
    [getAsyncTodos.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false,
        todoItems: action.payload,
        error: null,
      };
    },
    [getAsyncTodos.rejected]: (state, action) => {
      return {
        ...state,
        loading: false,
        todoItems: [],
        error: action.payload.message,
      };
    },
    [getAsyncTodos.pending]: (state, action) => {
      return {
        ...state,
        loading: true,
        todoItems: [],
        error: null,
      };
    },
    [addAsyncTodos.fulfilled]: (state, action) => {
      state.todoItems.push(action.payload);
    },
    [toggleAsyncTodos.fulfilled]: (state, action) => {
      const selectedTodo = state.todoItems.find(
        (t) => t.id === action.payload.id
      );
      selectedTodo.completed = action.payload.completed;
    },
    [deleteAsyncTodos.fulfilled]: (state, action) => {
      state.todoItems = state.todoItems.filter(
        (t) => t.id !== action.payload.id
      );
    },
  },
});

export const { addTodo, toggleTodos, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
