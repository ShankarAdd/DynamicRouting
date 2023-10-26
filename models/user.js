const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      allownull: false,
      autoIncrement : true,
      primaryKey : true
    },
    userName: {
        type: Sequelize.STRING,
        allownull: false
    },
    userEmail: {
      type: Sequelize.STRING,
      allownull: false
    }
});
module.exports = User;
