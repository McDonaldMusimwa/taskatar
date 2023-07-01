const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  owener: String,
  title: String,
  description: String,
  dateToDo: String,
  starttime: String,
  endtime: String,
  collaboration: {
    require: false,
    type: String,
  },
  status: {
    type: String,
    enum: ["done", "not done", "in progress"],
  },
});

const Task = mongoose.model("Task", taskSchema, "tasks");

module.exports = { Task };
