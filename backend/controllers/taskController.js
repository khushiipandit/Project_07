import Task from "../models/Task.js";

/*
====================================
CREATE TASK
====================================
*/
export const createTask = async (req, res) => {
  try {
    const { title, deadline, category } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      user: req.user._id,
      title,
      deadline,
      category,
    });

    res.status(201).json(task);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/*
====================================
GET TASKS
====================================
*/
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.json(tasks);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/*
====================================
UPDATE TASK
====================================
*/
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedTask);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/*
====================================
DELETE TASK
====================================
*/
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await task.deleteOne();

    res.json({ message: "Task removed" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};