const {Router} = require("express")
const userController = require("../controllers/userController")
const router = Router()

router.get("/dashboard", userController.userDashboard)

router.get("/all-events", userController.getEvents)

router.get("/event/:id", userController.getEventDetails)

router.post("/event/:id/book", userController.booking)

module.exports = router