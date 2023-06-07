const Schema = require("../models/user");

module.exports = {
  createTask: async (req, res) => {
    try {
      const userId = req.params.userId;

      // Retrieve the user by their ID
      const user = await Schema.User.findById(userId);

      // Create a new task
      const newTask = {
        title: req.body.title,
        description: req.body.description,
        dateToDo: req.body.dateToDo,
        status: req.body.status,
      };

      // Add the new task to the user's tasks array
      user.tasks.push(newTask);

      // Save the updated user
      await user.save();

      res.status(201).json({ success: "Task created successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message || "Failed to create task" });
    }
  },
};
