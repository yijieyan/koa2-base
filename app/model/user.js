const Sequelize= require('sequelize');
const { sequelize } = require('../../core/db.js');
class User extends Sequelize.Model {

}

User.init ({
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  nickname:Sequelize.STRING,
  email:Sequelize.STRING,
  password:Sequelize.STRING,
  openid:{
    type:Sequelize.STRING,
    unique:true
  }
},{sequelize,tableName:'user'})