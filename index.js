const express = require("express");
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();
const PORT = process.env.appPORT | 3000;
const mysqlSetup = require('./databaseConnection/sequelize');
const v1Router = require('./apis/v1/index');

app.use(bodyParser.urlencoded({
  extended: true
}));


app.use('/v1', v1Router);

app.listen(PORT, (error) => {
  if (!error) {
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  } else console.log("Error occurred, server can't start", error);
});
