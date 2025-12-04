const {Router} = require("express")
const userController = require("../controllers/userController")
const router = Router()

router.get("/dashboard", userController.userDashboard)

module.exports = router