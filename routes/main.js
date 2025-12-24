const {Router} = require('express');
const path = require('path');
const router = Router()

router.get("/", (req, res) => {
    res.render("landing",{pageTitle: "Landing Page" , path:"/landing" });
});

module.exports = router;