const passport = require("passport");
const {Strategy} = require("passport-local");
const {User} = require("../models");
const EventManager = require("../models/eventManager");
const VenueOwner = require("../models/venueOwner");
const bcrypt = require("bcrypt");

//user strategy
passport.use('user-local', new Strategy({usernameField: "phoneNumber" ,passwordField: "password", passReqToCallback:true}, async (req,phoneNumber, password, done) => {
    try {
        const user = await User.findOne({where :{phoneNumber}});
        if(!user){
            return done(null, false, {message: "شماره تلفن ثبت نشده است"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            return done(null, {type:"user",id:user.id});
        }else{
            return done(null, false, {message: "شماره تلفن یا رمز عبور اشتباه است"});
        }
        
    } catch (err) {
        console.log(err);
    }
}))


//event manager strategy
passport.use('event-local', new Strategy({usernameField: "phoneNumber" ,passwordField: "password", passReqToCallback:true}, async (req,phoneNumber, password, done) => {
        console.log("🔥 event-local CALLED");
    try {
        const eManager = await EventManager.findOne({where :{phoneNumber}});
        console.log("EVENT MANAGER INSTANCE:", eManager);
        console.log("ID:", eManager.id);
        console.log("ATTR:", EventManager.rawAttributes);

        if(!eManager){
            return done(null, false, {message: "شماره تلفن ثبت نشده است"});
        }
        const isMatch = await bcrypt.compare(password, eManager.password);
        if(isMatch){
            return done(null, {type:"event_manager",id:eManager.id});
        }else{
            return done(null, false, {message: "شماره تلفن یا رمز عبور اشتباه است"});
        }
        
    } catch (err) {
        console.log(err);
    }
}))




//venue owner strategy
passport.use('venue-local', new Strategy({usernameField: "phoneNumber" ,passwordField: "password", passReqToCallback:true}, async (req,phoneNumber, password, done) => {
    try {
        const vOwner = await VenueOwner.findOne({where :{phoneNumber}});
        if(!vOwner){
            return done(null, false, {message: "شماره تلفن ثبت نشده است"});
        }
        const isMatch = await bcrypt.compare(password, vOwner.password);
        if(isMatch){
            return done(null, {type:"venue_owner",id:vOwner.id});
        }else{
            return done(null, false, {message: "شماره تلفن یا رمز عبور اشتباه است"});
        }
        
    } catch (err) {
        console.log(err);
    }
}))




 passport.serializeUser((user, done) => {
        console.log("SERIALIZE:", user);
        done(null, user);
    });

  


passport.deserializeUser(async (user, done) => {
    console.log("DESERIALIZE INPUT:", user);
    const { type, id } = user;
    try {
        let data = null;

        if (type === "user") data = await User.findByPk(id);
        if (type === "event_manager") data = await EventManager.findByPk(id);
        if (type === "venue_owner") data = await VenueOwner.findByPk(id);

        if (!data) return done(null, false);
        
        const plain = data.get({ plain: true }); //table fields without meta data
        console.log(plain,type)
        done(null,{...plain,type});
    } catch (err) {
        done(err);
    }
    });

 


// passport.serializeUser((user, done) => { //while logging in
//     done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {   //for next requests
//     try {
//         const user = await User.findByPk(id);
//         done(null, user);
//     } catch (err) {
//         done(err);
//     }
// }); 