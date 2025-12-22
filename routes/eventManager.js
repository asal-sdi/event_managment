const {Router} = require("express")
const eventMangerController = require("../controllers/eventManagerController")
const router = Router()

router.get("/dashboard", eventMangerController.emDashboard)


router.get("/send-request", eventMangerController.showSendRequestForm)
module.exports = router