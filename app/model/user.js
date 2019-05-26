const Sequelize = require('sequelize');
const bcryptjs = require('bcryptjs');
const {
  sequelize
} = require('../../core/db.js');
class User extends Sequelize.Model {

}

User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    set(val) {
      let salt = bcryptjs.genSaltSync(10);
      let pwd = bcryptjs.hashSync(val, salt);
      this.setDataValue('password', pwd);
    }
  },
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  }
}, {
  sequelize,
  tableName: 'user'
})

module.exports = User;