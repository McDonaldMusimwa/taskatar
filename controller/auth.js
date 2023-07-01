const Schema = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWTTOKEN = process.env.JWTTOKEN;

module.exports = {
    //#swagger.tags=['Login']
  login: async (req, res, next) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      console.log(email);
      const loadedUser = await Schema.User.findOne({ email: email });

      if (!loadedUser) {
        const error = new Error("Sorry, this email is not in our database");
        error.status = 401;
        throw error;
      }

      const isMatch = await bcrypt.compare(password, loadedUser.password);

      if (!isMatch) {
        const error = new Error("Wrong password");
        error.status = 401;
        throw error;
      }

      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        JWTTOKEN,
        { expiresIn: "1h" }
      );

      res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    } catch (error) {
      res.status(error.status || 500).json({
        error: error.message || "Failed to create task",
      });
      next(error);
    }
  },
};
