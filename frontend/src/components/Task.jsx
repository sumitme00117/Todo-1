import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, getTasks, updateTask } from "../redux/actions/task";
import { clearError, clearMessage } from "../redux/reducers/taskReducer";
import "../App.css"
const Task = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, message, alltasks, loading } = useSelector((state) => state.tasks);
  const submitHandler = (title, description) => {
    dispatch(addTask(title, description));
    setTitle("");
    setDescription("");
  };

  const openUpdatePopup = (task) => {
    setCurrentTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setIsPopupOpen(true);
  };

  const handleUpdateTask = () => {
    if (currentTask) {
      dispatch(updateTask(currentTask._id, title, description));
      setIsPopupOpen(false);
      setTitle("");
      setDescription("");
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setTitle("");
    setDescription("");
  };

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [dispatch, error, message]);
  return (
    <>
      <div>This is task component</div>
      <div>
        <button onClick={() => navigate("/")}>Home</button>
      </div>
      <label>Title</label>
      <input
        value={title}
        type="text"
        placeholder="Please enter title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Description</label>
      <input
        value={description}
        type="text"
        placeholder="Please enter description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={() => submitHandler(title, description)}>
        Add Task
      </button>
      {alltasks?.map((item, index) => (
        <>
          <div key={index}>
            Title- {item.title}
            Description- {item.description}
          </div>
          <div>
            <button onClick={() => openUpdatePopup(item)}>Update Task</button>
            <button
              onClick={() => {
                dispatch(deleteTask(item._id));
              }}
            >
              Delete Task
            </button>
          </div>
        </>
      ))}

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h3>Update Task</h3>
            <label>Title</label>
            <input
              value={title}
              type="text"
              placeholder="Update title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Description</label>
            <input
              value={description}
              type="text"
              placeholder="Update description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={handleUpdateTask}>Update</button>
            <button onClick={closePopup}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Task;
