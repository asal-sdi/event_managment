const {DataTypes} = require('sequelize');
const sequelize = require('../configs/database');

const Event = sequelize.define('Event', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    time:{
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    status:{
        type: DataTypes.ENUM('upcoming', 'completed'),
        allowNull: false,
        defaultValue: 'upcoming',
    },
    location: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    type:{
        type: DataTypes.ENUM("کنفرانس","کارگاه","فستیوال","سمینار",
            "نمایشگاه","مسابقه","شبکه‌سازی","خیریه","گالا","ورزشی"),
        allowNull: true,
    },
    price:{
        type: DataTypes.FLOAT,
        allowNull:true
    },
    image:{
        type:DataTypes.STRING,
        allowNull:true
    },

    ratingAvg: { type: DataTypes.FLOAT, defaultValue: 0 },
    ratingCount: { type: DataTypes.INTEGER, defaultValue: 0 },

})








module.exports = Event;