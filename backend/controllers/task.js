import { Task } from "../models/task.js";

export const newTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user._id;

    if (!title || !description)
      return res.status(500).json({
        success: false,
        msg: "Please enter all fields",
      });

    const tasks = await Task.create({
      title,
      description,
      userId,
    });

    await tasks.save();

    return res.status(201).json({
      success: true,
      tasks,
      msg: "Task added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const id = req.params.id;

    if (!title || !description)
      return res.status(500).json({
        success: false,
        msg: "Please enter all fields",
      });

    const task = await Task.findById(id);

    if (!task)
      return res.status(500).json({
        success: false,
        msg: "Please task not found",
      });

    task.title = title;
    task.description = description;

    await task.save();

    return res.status(201).json({
      success: true,
      task,
      msg: "Task updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;

    const task = await Task.findOne({ _id: id });

    if (!task)
      return res.status(500).json({
        success: false,
        msg: "Task not found",
      });

    await Task.deleteOne({ _id: id });

    return res.status(201).json({
      success: true,
      task,
      msg: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const userId = req.user._id;

    const alltasksr = await Task.find({userId});

    return res.status(201).json({
      success: true,
      alltasksr,
      msg: "All tasks retrieved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};
