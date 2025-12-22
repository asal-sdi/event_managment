const path = require('path')
const {Event,EventManger,VenueRequest} = require('../models')

exports.emDashboard = (req,res) =>{
    res.render("dashboards/em-dashboard",{pageTitle:"داشبورد" , user:req.user ,path:"/dashboard" })
}

exports.showSendRequestForm = async(req,res) => {
    res.render("event-manager/send-request",{pageTitle:"ارسال درخواست مکان", user:req.user,path:"/send-request"})
}

exports.sendRequest = async(req,res) => {
    try {
        const{title,location,description,price,venueId} = req.body

        await VenueRequest.create({
            title,
            location,
            description,
            price,
            venueId,
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


