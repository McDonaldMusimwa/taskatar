const express = require('express');
const app = express()
const PORT =  8080
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json')
//database
const mongoose = require('mongoose')
require("dotenv").config();
const DATABASEURL = process.env.DATABASEURL;

//routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/',require('./routes/index'))





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
    //console.log(result)
    console.log("connection to database successfull");
  })
  .catch((err) => {
    console.log(err);
  });