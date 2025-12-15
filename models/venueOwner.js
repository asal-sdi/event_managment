const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database'); 

const VenueOwner = sequelize.define('VenueOwner', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  phoneNumber:{
    type:DataTypes.STRING(15),
    allowNull:false,
    unique:true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  nationalCode: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
  },
  role: {
    type: DataTypes.ENUM('user', 'venueOwner', 'eventManager'),
    allowNull: false,
    defaultValue: 'venueOwner',
  },
}, {
  timestamps: true,
});
        

module.exports = VenueOwner;
