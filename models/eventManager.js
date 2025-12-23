const {DataTypes} = require('sequelize');
const sequelize = require('../configs/database');

const EventManger = sequelize.define('EventManger', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey: true,
    },
    name: { 
        type: DataTypes.STRING,
         allowNull: false },
    phoneNumber: { 
        type: DataTypes.STRING(15),
        allowNull: true,
        unique: true
    },
    nationalCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    certificateId: { 
        type: DataTypes.STRING,
        allowNull: false 
    },
    password: { 
        type: DataTypes.STRING,
        allowNull: true 
    },
    role: {
        type: DataTypes.ENUM('user', 'venueOwner', 'eventManager'),
        allowNull: false,
        defaultValue: 'eventManager',
    }
    
}, {
    timestamps: true,
})



module.exports = EventManger;