import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alltasks: [],
  loading: true,
  error: null,
  message: null,
};

export const taskReducer = createSlice({
  name: "taskReducer",
  initialState,
  reducers: {
    addTaskRequest: (state) => {
      state.loading = true;
    },
    addTaskSuccess: (state, action) => {
      state.loading = false;
      state.alltasks = [...state.alltasks, action.payload];
      state.message = "Task added Successfully";
    },
    addTaskFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateTaskRequest: (state) => {
      state.loading = true;
    },
    updateTaskSuccess: (state, action) => {
      state.loading = false;
      state.alltasks = state.alltasks.map(task =>
        task._id === action.payload._id ? action.payload : task
      );
      state.message = "Task updated successfully";
    },
    updateTaskFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getTasksRequest: (state) => {
      state.loading = true;
    },
    getTasksSuccess: (state, action) => {
      state.loading = false;
      state.alltasks = action.payload;
      state.message = "Task fetched";
    },
    getTasksFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteTaskRequest: (state) => {
      state.loading = true;
    },
    deleteTaskSuccess: (state, action) => {
      state.loading = false;
      state.alltasks = state.alltasks.filter((task) => task._id !== action.payload),
      state.message = "Task deleted successfully";
    },
    deleteTaskFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // logoutRequest: (state) => {
    //   state.loading = true;
    // },
    // logoutSuccess: (state, action) => {
    //   state.loading = false;
    //   state.isAuthenticated = false;
    //   state.message = "Logout Success";
    //   state.user = null;
    // },
    // logoutFail: (state, action) => {
    //   state.loading = false;
    //   state.isAuthenticated = true;
    //   state.error = action.payload;
    // },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
});

export const {
  addTaskRequest,
  addTaskSuccess,
  addTaskFail,
  updateTaskRequest,
  updateTaskSuccess,
  updateTaskFail,
  getTasksRequest,
  getTasksSuccess,
  getTasksFail,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFail,
  clearError,
  clearMessage,
} = taskReducer.actions;
