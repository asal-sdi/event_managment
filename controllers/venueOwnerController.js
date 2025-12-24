const path = require('path');
const {Venue,VenueRequest,Event,EventManger} = require('../models');
const { stat } = require('fs');

exports.voDashboard = async(req,res) =>{
    try {
    const venues = await Venue.findAll({where:{venueOwnerId:req.user.id},
        order: [['createdAt', 'DESC']],
        raw:true
})
    const requests = await VenueRequest.findAll({
            include: [
                {
                model: Venue,
                required: true,
                where: {
                    venueOwnerId:req.user.id
                },
                }
            ],
                order: [['createdAt', 'DESC']],
                raw:true

            });

    const reservations = await VenueRequest.findAll({
        where:{status:"accepted"},
            include: [
                {
                model: Venue,
                required: true,
                where: {
                    venueOwnerId:req.user.id,
                },
                

                }
            ],order: [['createdAt', 'DESC']],
            raw:true
            })
            const user = req.user
            if(!user){
                return res.redirect("auth/vo-login")
            }
    res.render("dashboards/vo-dashboard",{pageTitle:"داشبورد" , user ,venues,requests ,reservations, path:"/dashboard" })
   
    } catch (error) {
        console.log(error);
    }
}

exports.getCreateVenue = (req,res) => {
    res.render("venue-owner/addVenue",{
        pageTitle:"ایجاد مکان جدید", 
        user:req.user,
        path:"/add-venue",
        message:req.flash("success_msg"),
        error:req.flash("error")})
}


exports.createVenue = async(req,res) => {
    const errors = []
    try {
        const{name,type,city,address,capacity,price,features,activeDays,opening,closing,} = req.body 

        const imagePath = req.file
            ? `/uploads/venues/${req.file.filename}`
            : null;


        await Venue.create({
            name,
            type,
            city,
            address,  
            capacity,
            price,
            features,
            activeDays,
            opening,
            closing,
            image: imagePath,
            venueOwnerId: req.user.id
        })
        req.flash("success_msg" , "مکان با موفقیت اضافه شد")
        res.redirect('/venue-owner/dashboard');
    } catch (err) {
        console.log(err);
        if (err.inner && Array.isArray(err.inner)){
            err.inner.isforEach((e)=>{
                errors.push({
                    name:e.path,
                    message:e.message
                })
            })
    }
        return res.render("venue-owner/addVenue",{pageTitle:"ایجاد مکان جدید",path:"/add-venue", user:req.user , errors})

} 
}


exports.getEditVenue = async (req,res) => {
    try {
        const venue = await Venue.findByPk(req.params.id)



    if(!venue){
        // return res.redirect("errors/404")
        req.flash("error" , "چنین مکانی وجود ندارد")
        return res.send("چنین مکانی وجود ندارد")
    }
    
    if(venue.venueOwnerId !== req.user.id){

        req.flash("error" , "شما اجازه ویرایش این مکان را ندارید")
        return res.redirect("/venue-owner/dashboard")
    }else{
        res.render("venue-owner/editVenue" , {
            pageTitle:"ویرایش مکان ",
            path:"/edit-venue",
            user:req.user,
            venue,
            message:req.flash("success_msg"),
            error:req.flash("error")
        })
    }
    } catch (err) {
        console.log(err);
    }
    
}

exports.editVenue = async (req,res) => {
    const errors = []
    try{
        const{ name,type,city,address,description,capacity,price,features,opening,closing,image} = req.body
        const venue = await Venue.findOne({where:{id:req.params.id}})

        await venue.update({
            name,
            type,
            city,
            address,
            description,
            capacity,
            price,
            features,
            opening,
            closing,
            image
        })

        req.flash("success_msg" , "مکان با موفقیت ویرایش شد")
        res.redirect('/venue-owner/dashboard');

    }catch(err){
        console.log(err);
        if (err.inner && Array.isArray(err.inner)){
            err.inner.isforEach((e)=>{
                errors.push({
                    name:e.path,
                    message:e.message
                })
            })
        }
        return res.render("venue-owner/edit-venue" , {
            pageTitle:"ویرایش مکان ",
            user:req.user,
            errors
        })
    }
}


exports.deleteVenue = async(req,res) => {
    try {
        const venue = await Venue.findByPk(req.params.id);
    if (!venue) {
        req.flash("error", "مکانی یافت نشد");
        return res.redirect("/venue-owner/dashboard");
    }
    await venue.destroy();
    req.flash("success_msg" , "مکان با موفقیت حذف شد")
    res.redirect("/venue-owner/show-venues")
    } catch (err) {
        console.log(err)
    }
}

exports.showVenueRequests = async(req,res) => {
    try {
    const requests = await VenueRequest.findAll({
            include: [
                {
                model: Venue,
                required: true,
                where: {
                    venueOwnerId:req.user.id
                },
                }
            ],
                order: [['createdAt', 'DESC']],
                raw:true

            });
        res.render("venue-owner/requests" , {
            pageTitle:"درخواست ها",
            user:req.user,
            path:"/requests",
            requests
        })
    } catch (error) {
        console.log(error);
    }
    
}

exports.acceptRequest = async(req,res) => {
    try {
        const request  = await VenueRequest.findByPk(req.params.id)

        await request.update({status:"accepted"})

        await Event.create({
            title:request.eventName,
            date:Date.now(),
            description:request.description,
            price:request.price,
            eventManagerId:request.eventManagerId,
            venueId:request.venueId
        })
        req.flash("success_msg" , "درخواست با موفقیت پذیرفته شد")
        res.redirect("/venue-owner/requests")
    } catch (error) {
        console.log(error);
    }
}

exports.rejectRequest = async(req,res) => {
    try {
        const request  = await VenueRequest.findByPk(req.params.id)
        await request.update({status:"rejected"})
        req.flash("success_msg" , "درخواست توسط شما رد شد")
        res.redirect("/venue-owner/requests")
    } catch (error) {
        console.log(error);
    }
}