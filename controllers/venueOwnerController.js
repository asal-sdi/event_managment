const {Venue} = require('../models')

exports.voDashboard = (req,res) =>{
    res.render("dashboards/vo-dashboard",{pageTitle:"داشبورد" , user:req.user})
}

exports.getCreateVenue = (req,res) => {
    res.render("venue/create-venue",{pageTitle:"ایجاد مکان جدید", user:req.user})
}


exports.creatVenue = async(req,res) => {
    const errors = []
    try {
        const{name,location,capacity,price} = req.body 
        await Venue.create({
            name,
            location,  
            capacity,
            price,
            venueOwnerId: req.user.id
        })

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
    res.render("venue-owner/create-venue",{pageTitle:"ایجاد مکان جدید", user:req.user , errors})

} 
}


exports.getEditVenue = async (req,res) => {
    const venue = await Blog.venue({
        _id : req.params.id
    })

    if(!venue){
        // return res.redirect("errors/404")
        return res.send("چنین مکانی وجود ندارد")
    }
    
    if(venue.VenueOwnerId != req.user.id){
        return res.redirect("/dashboard")
    }else{
        res.render("venue-owner/edit-venue" , {
            pageTitle:"ویرایش مکان ",
            user:req.user,
            venue
        })
    }
}