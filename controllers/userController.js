const {User} = require('../models')

exports.userDashboard = (req,res) =>{
    res.render("dashboards/user-dashboard",{pageTitle:"داشبورد" , user:req.user})
}