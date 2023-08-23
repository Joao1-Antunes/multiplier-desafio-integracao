const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/db.config");
const syncModels = require("../models/index");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const dbConnection = async () => {
  try {
    await sequelize.authenticate();

    await syncModels(sequelize);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = {
  sequelize,
  DataTypes,
  dbConnection,
};
