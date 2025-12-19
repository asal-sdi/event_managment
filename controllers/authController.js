const {User,EventManger,VenueOwner} = require("../models");
const bcrypt = require("bcrypt")
const passport =  require("passport")
const session = require("express-session");
const path =/ require("path")/;



//user authentication controllers
exports.getRegister = (req, res) => {
    res.render("register",{pageTitle:"ثبت نام" ,path:"/register"});
}

exports.register = async(req,res) => {
    const errors = []
    try {
        const {name,phoneNumber,password,confirmPassword} = req.body
        const user = await User.findOne({where:{phoneNumber:phoneNumber}})
        if(user){
            errors.push({message:"حساب با این شماره تلفن قبلا ثبت شده است"})
            return res.render("register",{pageTitle:"ثبت نام" , errors})
        }
        if (password == confirmPassword){
            const hash = await bcrypt.hash(password, 10) //10 is salt which determines the complexity of the hash
            await User.create({name,phoneNumber,password:hash,role : 'user'})
            req.flash("success_msg" , "ثبت نام با موفقیت انجام شد")
            res.redirect("/auth/user-login")
        }else{
            errors.push({message:"رمز عبور و تایید رمز عبور با هم مطابقت ندارند"})
            return res.render("register",{pageTitle:"ثبت نام" , errors})
        }

    } catch (err) {
        if (err.inner && Array.isArray(err.inner)){
            err.inner.isforEach((e)=>{
                errors.push({
                    name:e.path,
                    message:e.message
                })
            })
        }else{
            errors.push({name:"general",message:err.message})
        }
        req.flash("error", errors.map(e => e.message).join(", "));
        return res.redirect("/auth/user-register"); 
    }
    
 }

exports.getUserLogin = (req,res) =>{
    res.render('login',{
        pageTitle:"ورود",
        path:"/login",
        message:req.flash("success_msg") ,
        error:req.flash("error")})
}

exports.handleUserLogin = (req,res) =>{
        passport.authenticate("user-local", {
        successRedirect: "/user/dashboard",
        failureRedirect: "/auth/user-login",
        failureFlash: true
    })(req, res);
}





//event manager authentication controllers
exports.getEmRegister = (req, res) => {
    res.render("eventManagerRegister",{
        pageTitle:"ثبت نام",
        path:"/register"

    });
}

exports.EmRegister = async(req,res) => {
    const errors = []
    try {
        const {name,phoneNumber,certificateId,nationalCode,password,confirmPassword} = req.body
        const eManager = await EventManger.findOne({where:{phoneNumber}})
        if(eManager){
            errors.push({message:"حساب با این شماره تلفن قبلا ثبت شده است"})
            return res.render("eventManagerRegister",{pageTitle:"ثبت نام" , errors})
        }
        if (password == confirmPassword){
            const hash = await bcrypt.hash(password, 10) //10 is salt which determines the complexity of the hash
            await EventManger.create({name,phoneNumber,certificateId,nationalCode,password:hash,role : 'eventManager'})
            req.flash("success_msg" , "ثبت نام با موفقیت انجام شد")
            res.redirect("/auth/em-login")
        }else{
            errors.push({message:"رمز عبور و تایید رمز عبور با هم مطابقت ندارند"})
            return res.render("eventManagerRegister",{pageTitle:"ثبت نام" , errors})
        }

    } catch (err) {
        console.log(err);
        if (err.inner && Array.isArray(err.inner)){
            err.inner.isforEach((e)=>{
                errors.push({
                    name:e.path,
                    message:e.message
                })
            })
        }else{
            errors.push({name:"general",message:err.message})
        }
        req.flash("error", errors.map(e => e.message).join(", "));
        return res.redirect("/auth/em-register"); 
    }
    
 }

exports.getEmLogin = (req,res) =>{
    res.render('eventMangerlogin',{
        pageTitle:"ورود",
        path:"/login",
        message:req.flash("success_msg") ,
        error:req.flash("error")})
}

exports.handleEmLogin = (req,res) =>{
        passport.authenticate("event-local", {
        successRedirect: "/event-manager/dashboard",
        failureRedirect: "/auth/em-login",
        failureFlash: true
    })(req, res);
}






//venue owner authentication controllers

exports.getVoRegister = (req, res) => {
    res.render("venueOwnerRegister",{
        pageTitle:"ثبت نام",
        path:"/register"

    });
}

exports.VoRegister = async(req,res) => {
    const errors = []
    try {
        const {name,phoneNumber,certificateId,nationalCode,password,confirmPassword} = req.body
        const vOwner = await VenueOwner.findOne({where:{phoneNumber}})
        if(vOwner){
            errors.push({message:"حساب با این شماره تلفن قبلا ثبت شده است"})
            return res.render("venueOwnerRegister",{pageTitle:"ثبت نام" , errors})
        }
        if (password == confirmPassword){
            const hash = await bcrypt.hash(password, 10) //10 is salt which determines the complexity of the hash
            await VenueOwner.create({name,phoneNumber,certificateId,nationalCode,password:hash,role : 'venueOwner'})
            req.flash("success_msg" , "ثبت نام با موفقیت انجام شد")
            res.redirect("/auth/vo-login")
        }else{
            errors.push({message:"رمز عبور و تایید رمز عبور با هم مطابقت ندارند"})
            return res.render("venueOwnerRegister",{pageTitle:"ثبت نام" , errors})
        }

    } catch (err) {
        console.log(err);
        if (err.inner && Array.isArray(err.inner)){
            err.inner.isforEach((e)=>{
                errors.push({
                    name:e.path,
                   message:e.message
                })
            })
        }else{
            errors.push({name:"general",message:err.message})
        }
        req.flash("error", errors.map(e => e.message).join(", "));
        return res.redirect("/auth/vo-register"); 
    }
    
 }

exports.getVoLogin = (req,res) =>{
    res.render('venueOwnerLogin',{
        pageTitle:"ورود",
        path:"/login",
        message:req.flash("success_msg") ,
        error:req.flash("error")})
}

exports.handleVoLogin = (req,res) =>{
        passport.authenticate("venue-local", {
        successRedirect: "/venue-owner/dashboard",
        failureRedirect: "/auth/vo-login",
        failureFlash: true
    })(req, res);
}