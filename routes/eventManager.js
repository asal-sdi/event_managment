const {Router} = require("express")
const eventMangerController = require("../controllers/eventManagerController")
const router = Router()

router.get("/dashboard", eventMangerController.emDashboard)

router.get("/show-venues", eventMangerController.showVenuesForRequest)
router.get("/venue/:id", eventMangerController.getSingleVenue)

router.get("/send-request/:id", eventMangerController.showSendRequestForm)
router.post("/send-request/:id", eventMangerController.sendRequest)

router.get("/edit-event/:id", eventMangerController.getEditEvent)
router.post("/edit-event/:id", eventMangerController.editEvent)

router.get("/delete-event/:id", eventMangerController.deleteEvent)

router.get("/my-requests", eventMangerController.showMyRequests)


module.exports = router