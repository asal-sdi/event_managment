const path = require('path');
const {User} = require('../models')

exports.userDashboard = (req,res) =>{
    res.render("dashboards/user-dashboard",{pageTitle:"داشبورد" , user:req.user})
}

exports.getEvents = async (req, res) => {
  const events = await Event.findAll({
    include: ["venue"],
    order: [["date", "ASC"]]
  });

  res.render("events/index", {
    pageTitle: "رویدادها",
    path: "/events",
    events
  });
};
