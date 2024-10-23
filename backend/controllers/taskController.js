const Task = require("../models/taskModel");
const { ApiResponse } = require("../utils/ApiResponse");
const CustomError = require("../utils/CustomError");

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.userId });
    res
      .status(200)
      .json(new ApiResponse(200, tasks, "Tasks fetched successfully"));
  } catch (error) {
    return next(new CustomError("Error while fetching tasks", 500));
    // res.status(500).json({ error: error.message });
  }
};
const getTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.userId });

    if (!task) {
      return next(new CustomError("Task not found", 404));
      // return res.status(404).json({ error: "Task not found" });
    }

    res
      .status(200)
      .json(new ApiResponse(200, task, "Task fetched successfully"));
  } catch (error) {
    return next(new CustomError(error.message, 500));
    // res.status(500).json({ error: error.message });
  }
};

const createtask = async (req, res, next) => {
  const { title, content } = req.body;
  try {
    const newTask = new Task({ title, content, user: req.userId });
    await newTask.save();
    res
      .status(201)
      .json(new ApiResponse(201, newTask, "Task created successfully"));
  } catch (error) {
    return next(new CustomError(error.message, 400));
    // res.status(400).json({ error: error.message });
  }
};

const updateTask = async (req, res, next) => {
  const { title, content, status } = req.body;
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { title, content, status },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return next(new CustomError("Task not found", 404));
      // return res
      //   .status(404)
      //   .json({ error: "Task not found or not authorized" });
    }

    res
      .status(200)
      .json(new ApiResponse(200, updateTask, "Task updated successfully"));
  } catch (error) {
    return next(new CustomError(error.message, 400));
    // res.status(400).json({ error: error.message });
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!deletedTask) {
      return next(new CustomError("Task not found", 404));
      // return res
      //   .status(404)
      //   .json({ error: "Task not found or not authorized" });
    }

    res
      .status(200)
      .json(new ApiResponse(200, null, "Task deleted successfully"));
  } catch (error) {
    return next(new CustomError(error.message, 500));
    res.status(500).json({ error: error.message });
  }
};
const updateTaskStatus = async (req, res, next) => {
  const { status } = req.body; // Expecting only the status in the request body
  try {
    // Validate the status
    if (!["todo", "inprogress", "completed"].includes(status)) {
      return next(new CustomError("Invalid status value", 400));
      // return res.status(400).json({ error: "Invalid status value" });
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return next(new CustomError("Task not found", 404));
      // return res
      //   .status(404)
      //   .json({ error: "Task not found or not authorized" });
    }

    res
      .status(200)
      .json(new ApiResponse(200, updateTask, "Task updated successfully"));
  } catch (error) {
    return next(new CustomError(error.message, 400));
    // res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllTasks,
  getTask,
  createtask,
  updateTask,
  deleteTask,
  updateTaskStatus,
};
