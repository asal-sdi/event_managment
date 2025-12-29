const path = require('path')
const {Event,EventManger,VenueRequest,Venue,VenueOwner} = require('../models')
const { stat } = require('fs');


exports.emDashboard = async(req,res) =>{
    try {
        const events = await Event.findAll(
        {where:{eventManagerId:req.user.id},
        include:[{
            model:Venue,
        }],
        order: [['createdAt', 'DESC']],
        raw:true
    })
   
    const upcomingEvent = await Event.findAll({where:{eventManagerId:req.user.id, status:'upcoming'}})
    const requests = await VenueRequest.findAll({where:{eventManagerId:req.user.id , status:'pending'}})
    const completedEvent = await Event.findAll({where:{eventManagerId:req.user.id, status:'completed'}})
    console.log(req.user.id)
    console.log(events)
    res.render("dashboards/em-dashboard",{pageTitle:"داشبورد" ,
         user:req.user ,
         path:"/dashboard",
        events,
        upcomingEvent,
        requests,
        completedEvent,
     })
    } catch (error) {
        console.log(error)
    }
    
}


exports.showVenuesForRequest = async(req,res) => {
    try {
        const venues = await Venue.findAll({
            include: [{
                model: VenueOwner,
            }],
            raw:true})

            console.log(venues)
        res.render("event-manager/show-venues",{pageTitle:"ارسال درخواست مکان", user:req.user,path:"/show-venues", venues})
    } catch (err) {
        console.log(err);
    }
}

exports.getSingleVenue = async(req,res) => {
    try {
        const venue = await Venue.findByPk(req.params.id)
        if (!venue) {
            req.flash("error", "مکانی یافت نشد");
            return  res.redirect("/event-manager/show-venues")
        }
        res.render("event-manager/single-venue",{pageTitle:"جزئیات مکان", user:req.user,path:"/show-venues", venue})
    } catch (err) {
        console.log(err);
    }
}

exports.showSendRequestForm = async(req,res) => {
    const venueId = req.params.id
    res.render("event-manager/send-request",{pageTitle:"ارسال درخواست مکان", user:req.user,path:"/send-request", venueId})
}

exports.sendRequest = async(req,res) => {
    try {
        const{title,type,date,description,time,price} = req.body
        const venueId = req.params.id

        const imagePath = req.file
            ? `/uploads/venues/${req.file.filename}`
            : null;

        await VenueRequest.create({
            title,
            type,
            date,
            description,
            time,
            price,
            venueId,
            image: imagePath,
            eventManagerId: req.user.id
        })
    } catch (err) {
        console.log(err);
    }

    res.redirect('/event-manager/dashboard');
}


exports.showMyRequests = async(req,res) => {
    const venueRequests = await VenueRequest.findAll({where:{eventManagerId:req.user.id}, include:[EventManger]})   
    res.render("event-manager/my-requests" , {
        pageTitle:"درخواست های من",
        path:"/my-requests",
        user:req.user,
        venueRequests
    })
}


exports.cancelRequest = async(req,res) => {
    try {
        const request = await VenueRequest.findByPk(req.params.id);
        if (!request) {
            req.flash("error", "درخواستی یافت نشد");
            return res.redirect("/event-manager/my-requests");
        }
        await request.destroy();
        req.flash("success_msg" , "درخواست با موفقیت لغو شد")
        res.redirect("/event-manager/my-requests")
    }
    catch (err) {
        console.log(err)
    }
}



exports.getEditEvent = async(req,res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (!event) {
            req.flash("error", "رویدادی یافت نشد");
            return res.redirect("/event-manager/dashboard");
        }
        res.render("event-manager/edit-event", {
            pageTitle: "ویرایش رویداد",
            user: req.user,
            event
        });
    }
    catch (err) {
        console.log(err);
    }
}



exports.editEvent = async(req,res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (!event) {
            req.flash("error", "رویدادی یافت نشد");
            return res.redirect("/event-manager/dashboard");
        }
        res.render("event-manager/edit-event", {
            pageTitle: "ویرایش رویداد",
            user: req.user,
            event
        });
    }
    catch (err) {
        console.log(err);
    }
}


exports.deleteEvent = async(req,res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (!event) {
            req.flash("error", "رویدادی یافت نشد");
            return res.redirect("/event-manager/dashboard");
        }

        await event.destroy();
        req.flash("success_msg" , "رویداد با موفقیت حذف شد")
        res.redirect("/event-manager/dashboard")
    }
    catch (err) {
        console.log(err)
    }
}


