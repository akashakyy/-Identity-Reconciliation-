const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../databaseConnection/sequelize");

const contactModel = sequelize.define("contact", {
    id: {
      type: DataTypes.BIGINT(20),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    linkedId: {
      type: DataTypes.BIGINT(20),
      allowNull: true,
    },
    linkPrecedence: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "contact",
  }
);

module.exports = contactModel;
