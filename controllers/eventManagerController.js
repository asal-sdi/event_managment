const {Event,EventManger} = require('../models')

exports.emDashboard = (req,res) =>{
    res.render("dashboards/em-dashboard",{pageTitle:"داشبورد" , user:req.user})
}

exports.createEvent = async(req,res) => {
    try {
        const{title,location,description,price} = req.body

        await Event.create({
            title,
            location,
            description,
            price,
            date: Date.now(),
            eventManagerId: req.user.id
        })
    } catch (err) {
        
    }

    res.redirect('/event-manager/dashboard');
}