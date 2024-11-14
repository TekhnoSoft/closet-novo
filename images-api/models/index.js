const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.SQL_DATABASE, process.env.SQL_USER, process.env.SQL_PASS, {
  dialect: 'mysql',
  host: process.env.SQL_HOST,
  port: process.env.SQL_PORT
});

const db = {
  sequelize,
  Sequelize,
  File: require('./file')(sequelize, Sequelize),
};

module.exports = db;