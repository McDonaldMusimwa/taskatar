const { ObjectId } = require("mongoose");
const Schema = require("../models/task");

module.exports = {
  createTask: async (req, res) => {
    //#swagger.tags=['Task']

    //extract user
    const userId = req.params.userId;
    try {
      // Create a new task
      const newTask = {
        owener: userId,
        title: req.body.title,
        description: req.body.description,
        dateToDo: req.body.dateToDo,
        starttime: req.body.starttime,
        endtime: req.body.endtime,
        collaboration: req.body.collaboration,
        status: req.body.status,
      };
      console.log(req.body);
      // Add the new task to the user's tasks array

      // Save the updated user
      const newtask = new Schema.Task(newTask);
      const savedtask = await newtask.save();
      res.status(201).json({ success: "Task created successfully" });
      return { ...savedtask._doc, _id: savedtask.toString() };
    } catch (error) {
      res.status(500).json({ error: error.message || "Failed to create task" });
    }
  },
  getAllTasks: async (req, res) => {
    //#swagger.tags=['Task']
    try {
      const userId = req.params.userId;

      // Retrieve the user by their ID
      const tasks = await Schema.Task.find({ owener: userId });

      const formattedTasks = tasks.map((task) => {
        return { ...task._doc, _id: task._id.toString() };
      });
      res.status(201).json(formattedTasks);
    } catch (error) {
      res.status(500).json({ error: error.message || "Failed to create task" });
    }
  },
  getTask: async (req, res) => {
    //#swagger.tags=['Task']

    const taskId = req.params.taskId;
    try {
      // Retrieve the user by their ID
      const task = await Schema.Task.findOne({ _id: ObjectId(taskId) });

      if (!task) {
        return res.status(404).json({ error: "task not found" });
      }

      res.status(200).json({ ...task._doc, _id: task._id.toString() });
    } catch (error) {
      res
        .status(500)
        .json({ error: error.message || "Failed to retrieve task" });
    }
  },
  modifyTask: async (req, res) => {
    //#swagger.tags=['Task']

    const taskId = req.params.taskId;

    try {
      // Retrieve the task by id
      const task = await Schema.Task.findById(taskId.trim());

      console.log(task);
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      //extract task from request
      const modifiedtask = {
        title: req.body.title,
        description: req.body.description,
        dateToDo: req.body.dateToDo,
        starttime: req.body.starttime,
        endtime: req.body.endtime,
        collaboration: req.body.collaboration,
        status: req.body.status,
      };

      //update task
      task.title = modifiedtask.title;
      task.description = modifiedtask.description;
      task.dateToDo = modifiedtask.dateToDo;
      task.starttime = modifiedtask.starttime;
      task.endtime = modifiedtask.endtime;
      task.collaboration = modifiedtask.collaboration;
      task.status = modifiedtask.status;

      //save change
      await task.save();

      res.status(200).json({ ...task._doc, _id: task._id.toString() });
    } catch (error) {
      res
        .status(500)
        .json({ error: error.message || "Failed to retrieve task" });
    }
  },

  deleteTask: async (req, res) => {
    //#swagger.tags=['Task']
    try {
      const taskId = req.params.taskId;
      //const userId = req.params.userId;

      // Retrieve the user by their ID

      const task = await Schema.Task.deleteOne({ _id: taskId.trim() });

      res.status(200).json({ success: "Task deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message || "Failed to delete task" });
    }
  },
};
