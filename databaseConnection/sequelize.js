const Sequelize = require("sequelize");
const config = require("../config/config.json");
const envConfig = config[process.env.appEnv];

const mysqlDb = new Sequelize(
  envConfig.database,
  envConfig.username,
  envConfig.password,
  {
    host: envConfig.host,
    port: process.env.dbPORT,
    dialect: envConfig.dialect,
    operationsAliases: false,
    pool: {
      max: 5,
      min: 1,
    },
  }
);

mysqlDb
  .authenticate()
  .then(() => {
    console.log("Mysql has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the mysql database:", err);
  });

module.exports = mysqlDb;
