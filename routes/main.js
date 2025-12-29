const {Router} = require('express');
const{Event} = require('../models');
const path = require('path');
const router = Router()

router.get("/", async(req, res) => {
    const events =  await Event.findAll({
        order: [["date", "ASC"]],
        limit: 3,
        raw:true
      });
    res.render("landing",{pageTitle: "صفحه اصلی" , path:"/landing" ,events});
});


router.get("/about-us", (req, res) => {

    
    res.render("about-us",{pageTitle: "درباره ما" , path:"/about" });
});

router.get("/contact-us", (req, res) => {
    res.render("contact-us",{pageTitle: "تماس با ما" , path:"/contact" });
});

module.exports = router;