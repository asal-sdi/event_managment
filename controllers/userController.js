const path = require('path');
const {User} = require('../models')

exports.userDashboard = (req,res) =>{
    res.render("dashboards/user-dashboard",{pageTitle:"داشبورد" , user:req.user,path:"/dashboard" })
}

exports.getEvents = async (req, res) => {
  const events = await Event.findAll({
    include: ["venue"],
    order: [["date", "ASC"]]
  });

  res.render("show-events", {
    pageTitle: "رویدادها",
    path: "/all-events",
    events
  });
};


exports.getEventDetails = async (req, res) => {
  const event = await Event.findByPk(req.params.id, {
    include: ["venue", "eventManager"]
  }); 
  if (!event) {
    req.flash("error", "رویداد یافت نشد");
    return res.redirect("/user/all-events");
  }
  res.render("events-details", {
    pageTitle: "جزئیات رویداد",
    event
  });
};


exports.booking = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      req.flash("error", "رویداد یافت نشد");
      return res.redirect("/user/all-events");
    }

    req.flash("success_msg", "رزرو با موفقیت انجام شد");
    res.redirect("/user/all-events");
  }
  catch (err) {
    console.log(err);
    req.flash("error", "خطایی در رزرو رخ داد");
    res.redirect("/user/all-events");
  }
};
