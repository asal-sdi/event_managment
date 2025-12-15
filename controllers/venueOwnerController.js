const {Venue,VenueRequest,Event} = require('../models')

exports.voDashboard = async(req,res) =>{
    try {
    const venues = await Venue.findAll({where:{venueOwnerId:req.user.id}})
    res.render("dashboards/vo-dashboard",{pageTitle:"داشبورد" , user:req.user ,venues})
   
    } catch (error) {
        console.log(error);
    }
}

exports.getCreateVenue = (req,res) => {
    res.render("venue/addVenue",{
        pageTitle:"ایجاد مکان جدید", 
        user:req.user,
        message:req.flash("success_msg"),
        error:req.flash("error")})
}


exports.createVenue = async(req,res) => {
    const errors = []
    try {
        const{name,type,city,address,capacity,price} = req.body 
        await Venue.create({
            name,
            type,
            city,
            address,  
            capacity,
            price,
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
        return res.render("venue/addVenue",{pageTitle:"ایجاد مکان جدید", user:req.user , errors})

} 
}


exports.getEditVenue = async (req,res) => {
    const venue = await Blog.findbyPk(req.params.id)

    if(!venue){
        // return res.redirect("errors/404")
        req.flash("error" , "چنین مکانی وجود ندارد")
        return res.send("چنین مکانی وجود ندارد")
    }
    
    if(venue.VenueOwnerId != req.user.id){
        req.flash("error" , "شما اجازه ویرایش این مکان را ندارید")
        return res.redirect("venue-owner/dashboard")
    }else{
        res.render("venue-owner/editVenue" , {
            pageTitle:"ویرایش مکان ",
            user:req.user,
            venue,
            message:req.flash("success_msg"),
            error:req.flash("error")
        })
    }
}

exports.editVenue = async (req,res) => {
    const errors = []
    try{
        const{ name,type,city,address,capacity,price} = req.body
        const venue = await Venue.findOne({where:{id:req.params.id}})

        await venue.update({
            name,
            type,
            city,
            address,
            capacity,
            price
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
    const venueRequests = await VenueRequest.findAll({where:{venueOwnerId:req.user.id}, include:[Venue,Event]})

    res.render("venue-owner/requests" , {
        pageTitle:"درخواست ها",
        user:req.user,
        venueRequests
    })
}

exports.acceptRequest = async(req,res) => {
    try {
        const request  = await VenueRequest.findByPk(req.params.id)

        await request.update({status:"accepted"})

        await Event.create({
            name:request.eventName,
            date:request.eventDate,
            eventManagerId:request.eventManagerId,
            venueId:request.venueId
        })
        req.flash("success_msg" , "درخواست با موفقیت پذیرفته شد")
        res.redirect("/venue-owner/requests")
    } catch (error) {
        
    }
}