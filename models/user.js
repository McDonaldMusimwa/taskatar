const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    require: true,
  },

  tasks: [
    {
      title: String,
      description: String,
      dateToDo: Date,
      time: {
        type: String,
        default: "00:00", // Set a default time if needed
      },
      status: {
        type: String,
        enum: ["done", "not done", "in progress"],
      },
    },
  ],
});

//const OauthUserSchema = new Schema({});
const User = mongoose.model("User", userSchema, "users");
//const OAuthUser = mongoose.model("OAuthUser", OauthUserSchema, "users");
module.exports = {
  User,
};
