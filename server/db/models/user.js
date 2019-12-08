const { STRING, UUID, UUIDV4 } = require('sequelize');
const connection = require('../connection.js');
const User = connection.define('user', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  username: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});
module.exports = User;
