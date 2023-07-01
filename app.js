const express = require("express");
const passportSetUp = require("./services/passport");
const passport = require("passport");
const session = require("express-session");

const PORT = 8080;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
//database
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const DATABASEURL = process.env.DATABASEURL;
const SECRET = process.env.JWTTOKEN;
const app = express();

// Initialize and configure express-session middleware
app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

// Initialize passport and session after setting up the session middleware
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use(bodyParser.json());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", require("./routes/index"));

//Oauth

let database;
mongoose
  .connect(DATABASEURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "taskator",
  })
  .then((result) => {
    app.listen(PORT);
    database = result;
    console.log("connection to database successful");
  })
  .catch((err) => {
    console.log(err);
  });
