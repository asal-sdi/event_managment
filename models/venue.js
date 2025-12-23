const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const Venue = sequelize.define("Venue", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    type:{
        type: DataTypes.ENUM("cafe","conference_hall","restaurant","hotel",
            "other","conference_center","university","museum","gallery","satdium","park","office"),
        allowNull: true,
    },

    address: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },

    city: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

    capacity: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    phoneNumber: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    price:{
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    features:{
        type:DataTypes.JSON,
        allowNull:true
    },
    activeDays:{
        type:DataTypes.JSON,
        allowNull:true
    },
    opening:{
        type:DataTypes.STRING(20),
        allowNull:true
    },
    closing:{
        type:DataTypes.STRING,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },                    
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    venueOwnerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'venueowners', 
            key: 'id',
        }},
});








module.exports = Venue;
