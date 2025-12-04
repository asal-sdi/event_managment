const {Router} = require("express")
const eventMangerController = require("../controllers/eventManagerController")
const router = Router()

router.get("/dashboard", eventMangerController.emDashboard)

module.exports = router