const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING(15),
    allowNull: false,
    unique: true,
    validate: { is: /^[0-9]+$/  // Ensure only numeric characters
    },
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('user', 'venueOwner', 'eventManager'),
    allowNull: false,
    defaultValue: 'user',
  },
}, {
  timestamps: true,
  tableName: 'users',
});

module.exports = User;
