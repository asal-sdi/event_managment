const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('event_management', 'root', 'asal138413961398' , {
    host: 'localhost', //which host to connect to
    dialect: 'mysql', //which database dialect to use
});

module.exports = sequelize;