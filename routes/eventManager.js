const {Router} = require("express")
const eventMangerController = require("../controllers/eventManagerController")
const { isEventManager } = require("../middlewares/authMiddlewares");
const uploadImage = require('../middlewares/upload');
const router = Router()

router.get("/dashboard",isEventManager, eventMangerController.emDashboard)

router.get("/show-venues",isEventManager, eventMangerController.showVenuesForRequest)
router.get("/venue/:id", eventMangerController.getSingleVenue)

router.get("/send-request/:id",isEventManager, eventMangerController.showSendRequestForm)
router.post("/send-request/:id",uploadImage.single('image'), eventMangerController.sendRequest)

router.get("/edit-event/:id",isEventManager, eventMangerController.getEditEvent)
router.post("/edit-event/:id",isEventManager, eventMangerController.editEvent)
router.get("/delete-event/:id",isEventManager, eventMangerController.deleteEvent)

router.get("/my-requests",isEventManager, eventMangerController.showMyRequests)


module.exports = router