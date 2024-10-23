const express = require("express");
const router = express.Router();

const {
  createtask,
  getAllTasks,
  getTask,

  updateTask,
  deleteTask,
  updateTaskStatus,
} = require("../controllers/taskController.js");
const requireAuth = require("../middlewares/requireAuth.js");

router.use(requireAuth);
router.get("/", getAllTasks);
router.post("/", createtask);
router.get("/:id", getTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.patch("/:id/status", updateTaskStatus);

module.exports = router;
