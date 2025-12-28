const {Router} = require('express');
const path = require('path');
const router = Router()

router.get("/", (req, res) => {
    res.render("landing",{pageTitle: "صفحه اصلی" , path:"/landing" });
});


router.get("/about-us", (req, res) => {
    res.render("about-us",{pageTitle: "درباره ما" , path:"/about" });
});

router.get("/contact-us", (req, res) => {
    res.render("contact-us",{pageTitle: "تماس با ما" , path:"/contact" });
});

module.exports = router;