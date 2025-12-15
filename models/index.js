const {Sequelize, DateTypes} = require('sequelize')
const sequelize = require('../configs/database')

const User = require('./user')
const VenueOwner = require('./venueOwner')
const EventManger = require('./eventManager')
const Venue = require('./venue')
const Event = require('./event')
const Category = require('./category')
const VenueRequest = require('./venueRequest');



// Define associations here if needed


// Many-to-Many
Event.belongsToMany(Category, { through: 'EventCategories'});
Category.belongsToMany(Event, { through: 'EventCategories'});

// EventManager 1->N Event
EventManger.hasMany(Event, { foreignKey: 'eventManagerId' });
Event.belongsTo(EventManger, { foreignKey: 'eventManagerId' });

// Venue 1->N Event
Venue.hasMany(Event,{foreignKey: "venueId"});
Event.belongsTo(Venue,{foreignKey: "venueId"});

// VenueOwner 1->N Venue
VenueOwner.hasMany(Venue,{foreignKey : 'venueOwnerId'});
Venue.belongsTo(VenueOwner,{foreignKey : 'venueOwnerId'}) 


// Venue 1->N VenueRequest
VenueRequest.belongsTo(Venue, { foreignKey: "venueId" });
Venue.hasMany(VenueRequest, { foreignKey: "venueId" });


// EventManger 1->N VenueRequest
EventManger.hasMany(VenueRequest , { foreignKey: "eventManagerId" });
VenueRequest.belongsTo(EventManger, { foreignKey: "eventManagerId" });


module.exports = {
    User,
    VenueOwner, 
    EventManger,
    Venue,
    Event,
    Category,
    VenueRequest
}