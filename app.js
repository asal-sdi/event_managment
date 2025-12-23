const express = require('express')
const path = require('path')
const expressLayout = require("express-ejs-layouts");
const dotenv = require('dotenv')
const flash = require("connect-flash")
const session = require("express-session")
const passport = require("passport")
const sequelize = require('./configs/database');
const app = express()


//* loed config
dotenv.config({path:"./configs/config.env"})

//* passport config
require("./configs/passport")

//* view engine setup
app.use(expressLayout);
app.set("view engine" , "ejs")
app.set("layout","./layouts/mainlayout")
app.set("views" , "views")


//* body parser
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//*flash
app.use(flash())

//*session
app.use(session({
    secret :'secret',
    resave:false,
    saveUnitialized:false,
    cookie:{ maxAge: 60 * 60 * 1000 } // 1 hour

}))

//* statics
app.use(express.static(path.join(__dirname , "public"))) 


//*passport
app.use(passport.initialize())
app.use(passport.session())


app.use("/", require("./routes/main"))
app.use("/auth" , require("./routes/auth"))
app.use("/user",require("./routes/user"))
app.use("/event-manager",require("./routes/eventManager"))
app.use("/venue-owner",require("./routes/venueOwner"))

//* setup database
require('./models/index');
sequelize.sync().then(result => {
    console.log(result);
}).catch(err => {
    console.log(err);
});

app.get('/404' , (req,res) => {
    res.status(404).render("errors/404", { pageTitle: "error", path: "/404" });
})

const PORT = process.env.PORT || 3000   
app.listen(PORT,() => console.log(`server is running on ${PORT} in ${process.env.NODE_ENV} mode`))
