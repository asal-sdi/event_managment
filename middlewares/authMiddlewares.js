const {User,VenueOwner,EventManger} = require("../models");

exports.authenticated = (req ,res ,next) => {
    if(req.isAuthenticated()){
        return next();
    }
    res.status(403).render("errors/403", { pageTitle: "error", path: "/403" });
}

exports.isUser = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'user') {
        return next();
    }
    console.log(req.user);
    res.status(403).render("errors/403", { pageTitle: "error", path: "/403" });
}


exports.isVenueOwner = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'venueOwner') {
        return next();
    }
    console.log(req.user);
    res.status(403).render("errors/403", { pageTitle: "error", path: "/403" });
}

exports.isEventManager = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'eventManager') {
        return next();
    }
    res.status(403).render("errors/403", { pageTitle: "error", path: "/403" });
}