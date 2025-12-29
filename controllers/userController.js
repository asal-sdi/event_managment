const path = require('path');
const {User,Event,Venue} = require('../models');
const { error } = require('console');

exports.userDashboard = async(req,res) =>{
  try{
    const user = await User.findByPk(req.user.id, {
          include: {
            model:Event,
            include: {model:Venue,
              as: 'Venue'
            }
          }
          
        });

    const allEvents = await Event.findAll();

    const upcoming = await Event.findAll({
      where: {status:'upcoming'},
          include:{
            model: User,
            where: {id: req.user.id}
          }
          
        });

    const completed = await Event.findAll({
      where: {status:'completed'},
          include:{
            model: User,
            where: {id: req.user.id}
          }
          
        });
  res.render("dashboards/user-dashboard",{pageTitle:"داشبورد" , path:"/dashboard",user,upcoming,allEvents,completed,message:req.flash("success_msg"),
    error:req.flash("error")}) 
}catch(err){
  console.log(err);
}
  
}

exports.getEvents = async (req, res) => {
  const events = await Event.findAll({
    include: ["Venue"],
    order: [["date", "ASC"]],
    raw:true
  });


  res.render("show-events", {
    pageTitle: "رویدادها",
    path: "/all-events",
    events,
    message:req.flash("success_msg"),
    error:req.flash("error")
  });
};


exports.getEventDetails = async (req, res) => {
  const event = await Event.findByPk(req.params.id, {
    include: ["Venue"]
  }); 

  const reservationsCount = await event.countUsers();
  if (!event) {
    req.flash("error", "رویداد یافت نشد");
    return res.redirect("/user/all-events");
  }
  console.log(event);
  res.render("events-details", {
    pageTitle: "جزئیات رویداد",
    path: "/event",
    event,
    reservationsCount,
    message:req.flash("success_msg"),
    error:req.flash("error")
  });
};


exports.booking = async (req, res) => {
  const errors=[];
  try {
    const user = req.user
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      req.flash("error", "رویداد یافت نشد");
      return res.redirect("/user/show-events");
    }

    const alreadyReserved = await event.hasUser(user.id);
    if (alreadyReserved) {
      return req.flash("error", "قبلا این رویداد را رزرو کرده اید")
      , res.redirect("/user/show-events");
    }
    const reservedCount = await event.countUsers();

    if (reservedCount >= 50) {
      return req.flash("error", "ظرفیت رویداد تکمیل شده است")
      }


    await event.addUser(user.id);
    req.flash("success_msg", "رزرو با موفقیت انجام شد");
    res.redirect("/user/show-events");
  }
  catch (err) {
    console.log(err);
    req.flash("error", "خطایی در رزرو رخ داد");
    res.redirect("/user/show-events");
  }
};
