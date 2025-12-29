const {Router} = require("express")
const userController = require("../controllers/userController")
const {isUser} = require("../middlewares/authMiddlewares")
const router = Router()

router.get("/dashboard",isUser, userController.userDashboard)

router.get("/show-events", userController.getEvents)

router.get("/event/:id", userController.getEventDetails)

router.get("/book-event/:id", isUser,userController.booking)

module.exports = router