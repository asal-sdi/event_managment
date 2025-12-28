const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const VenueRequest = sequelize.define("VenueRequest", {
    id: { 
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true },

    status: {
        type: DataTypes.ENUM("pending", "accepted", "rejected"),
        defaultValue: "pending"
    },

    title: { 
        type: DataTypes.STRING(100), 
        allowNull: false },
    date: { 
        type: DataTypes.DATE,
        allowNull: false },
    time:{
        type: DataTypes.STRING(20),
        allowNull: false
    },
    description: { type: DataTypes.TEXT },
    type:{
            type: DataTypes.ENUM("کنفرانس","کارگاه","فستیوال","سمینار",
                "نمایشگاه","مسابقه","شبکه‌سازی","خیریه","گالا","ورزشی"),
            allowNull: true,
    },
    price: { type: DataTypes.FLOAT },
    image:{
        type:DataTypes.STRING,
        allowNull:true
    },

    venueId: { 
        type: DataTypes.INTEGER,
         allowNull: false },

    eventManagerId: { 
        type: DataTypes.INTEGER,
         allowNull: false }
});

module.exports = VenueRequest;
