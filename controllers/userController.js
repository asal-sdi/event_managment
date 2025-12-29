const path = require('path');
const {User,Event,Venue} = require('../models')

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
  res.render("dashboards/user-dashboard",{pageTitle:"داشبورد" , path:"/dashboard",user,upcoming,allEvents,completed}) 
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

  console.log("############################################################################################")
  console.log(events);
  res.render("show-events", {
    pageTitle: "رویدادها",
    path: "/all-events",
    events
  });
};


exports.getEventDetails = async (req, res) => {
  const event = await Event.findByPk(req.params.id, {
    include: ["Venue"]
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
