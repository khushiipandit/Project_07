import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} from "../controllers/taskController.js";

const router = express.Router();

/*
  =============================
  TASK ROUTES
  =============================
*/

/*
  GET    /api/tasks       -> Get all user tasks
  POST   /api/tasks       -> Create new task
*/
router
  .route("/")
  .get(protect, getTasks)
  .post(protect, createTask);


/*
  PUT    /api/tasks/:id   -> Update task
  DELETE /api/tasks/:id   -> Delete task
*/
router
  .route("/:id")
  .put(protect, updateTask)
  .delete(protect, deleteTask);

export default router;