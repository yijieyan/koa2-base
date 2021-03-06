const Sequelize = require('sequelize');
const { dbName, username, password, host, port } = require('../config/config.js').database;

const sequelize = new Sequelize(dbName, username, password, {
  dialect: 'mysql',
  host,
  port,
  timezone: '+08:00',
  logging: process.env.NODE_ENV === 'development',
  define: {
    paranoid: true,
    underscored: true
  }
});

sequelize.sync();
module.exports = {
  sequelize
};
