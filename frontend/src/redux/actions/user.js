import axios from "axios";
import {
  loadUserFail,
  loadUserRequest,
  loadUserSuccess,
  LoginFailure,
  LoginRequest,
  LoginSuccess,
  SignUpRequest,
  SignUpSuccess,
  SignUpFail,
  MyProfileRequest,
  MyProfileSuccess,
  MyProfileFail,
  logoutRequest,
  logoutSuccess,
  logoutFail,
} from "../reducers/userReducer";

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());
    const { data } = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/user/me`, {
      withCredentials: true,
    });
    dispatch(loadUserSuccess(data.user));
  } catch (error) {
    dispatch(loadUserFail(error.response.data.message));
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(LoginRequest());
    const { data } = await axios.post(
      `${import.meta.env.VITE_SERVER}/api/v1/user/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch(LoginSuccess(data.user));
  } catch (error) {
    dispatch(LoginFailure());
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(logoutRequest());

    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/v1/user/logout`,
      {
        withCredentials: true,
      }
    );

    dispatch(logoutSuccess(data.message));
  } catch (error) {
    dispatch(logoutFail(error.response.data.message));
  }
};

export const signUpUser =
  (name, email, password, avatar) => async (dispatch) => {
    try {
      dispatch(SignUpRequest());

      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/user/signup`,
        { name, email, password, avatar },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(SignUpSuccess(data.msg));
    } catch (error) {
      dispatch(SignUpFail(error.response.data.message));
    }
  };

export const profileUpdate =
  (name, email, password, avatar) => async (dispatch) => {
    try {
      dispatch(MyProfileRequest());

      const { data } = await axios.put(
        `${import.meta.env.VITE_SERVER}/api/v1/user/profile/update`,
        { name, email, password, avatar },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(MyProfileSuccess(data.msg));
    } catch (error) {
      dispatch(MyProfileFail(error.response.data.message));
    }
  };
