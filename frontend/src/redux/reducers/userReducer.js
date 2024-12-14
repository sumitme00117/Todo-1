import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  loading: false,
  isAuthenticated: false,
  error: null,
  message: null,
};

export const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    loadUserRequest: (state) => {
      state.loading = true;
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loadUserFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    LoginRequest: (state) => {
      state.loading = true;
    },
    LoginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.message = "Login Success";
    },
    LoginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.message = "Logout Success";
      state.user = null;
    },
    logoutFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.error = action.payload;
    },
    SignUpRequest: (state) => {
      state.loading = true;
    },
    SignUpSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.message = action.payload;
      state.user = null;
    },
    SignUpFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    MyProfileRequest: (state) => {
      state.loading = true;
    },
    MyProfileSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.message = action.payload;
      state.user = null;
    },
    MyProfileFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
});

export const {
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  LoginRequest,
  LoginSuccess,
  LoginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFail,
  SignUpRequest,
  SignUpSuccess,
  SignUpFail,
  MyProfileRequest,
  MyProfileSuccess,
  MyProfileFail,
  clearError,
  clearMessage,
} = userReducer.actions;
