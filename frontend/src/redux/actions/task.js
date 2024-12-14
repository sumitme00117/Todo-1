import { addTaskFail, addTaskRequest, addTaskSuccess, getTasksRequest, getTasksFail, getTasksSuccess, deleteTaskRequest, deleteTaskSuccess, deleteTaskFail, updateTaskRequest, updateTaskSuccess, updateTaskFail } from "../reducers/taskReducer";
import axios from "axios";

export const addTask = (title, description) => async (dispatch) => {
    try {
      dispatch(addTaskRequest());
  
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/task/new`,
        { title, description },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(addTaskSuccess(data.tasks));
    } catch (error) {
      dispatch(addTaskFail());
    }
  };


  export const getTasks = () => async (dispatch) => {
    try {
      dispatch(getTasksRequest());
  
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/v1/task/all`,
        {
          withCredentials: true,
        }
      );
      dispatch(getTasksSuccess(data.alltasksr));
    } catch (error) {
      dispatch(getTasksFail());
    }
  };

  export const deleteTask = (id) => async (dispatch) => {
    try {
      dispatch(deleteTaskRequest());
  
      const { data } = await axios.delete(
        `${import.meta.env.VITE_SERVER}/api/v1/task/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      dispatch(deleteTaskSuccess(data.task._id));
    } catch (error) {
      dispatch(deleteTaskFail());
    }
  };

  export const updateTask = (id, title, description) => async (dispatch) => {
    try {
      dispatch(updateTaskRequest());
  
      const { data } = await axios.put(
        `${import.meta.env.VITE_SERVER}/api/v1/task/update/${id}`,
        { title, description },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(updateTaskSuccess(data.task));
    } catch (error) {
      dispatch(updateTaskFail());
    }
  };