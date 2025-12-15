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
    location: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    price:{
        type: DataTypes.FLOAT
    },
    // eventManagerId:{
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references:{
    //         model: 'eventmangers',
    //         key: 'id',
    //     }
    // },
    // venueId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: true,
    //     references: {
    //         model: 'venues', 
    //         key: 'id',
    //     }},

    ratingAvg: { type: DataTypes.FLOAT, defaultValue: 0 },
    ratingCount: { type: DataTypes.INTEGER, defaultValue: 0 },

})








module.exports = Event;