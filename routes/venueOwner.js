const {Router} = require('express');
const venueOwnerContoller = require('../controllers/venueOwnerController');
const upload = require('../middlewares/upload');
const router = Router();

router.get('/dashboard', venueOwnerContoller.voDashboard);

router.get('/create-venue', venueOwnerContoller.getCreateVenue);
router.post('/create-venue',upload.single('image'), venueOwnerContoller.createVenue);

router.get('/edit-venue/:venueId', venueOwnerContoller.getEditVenue);
router.post('/edit-venue/:venueId', venueOwnerContoller.editVenue);

router.get('/delete-venue/:venueId', venueOwnerContoller.deleteVenue);

router.get("/show-requests", venueOwnerContoller.showVenueRequests);
router.get("/accept-request/:id", venueOwnerContoller.acceptRequest);
router.get("/reject-request/:id", venueOwnerContoller.rejectRequest);


module.exports = router;