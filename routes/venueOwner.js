const {Router} = require('express');
const venueOwnerContoller = require('../controllers/venueOwnerController');
const{isVenueOwner} = require('../middlewares/authMiddlewares');
const upload = require('../middlewares/upload');
const router = Router();


router.get('/create-venue', isVenueOwner, venueOwnerContoller.getCreateVenue);
router.post('/create-venue',upload.single('image'), venueOwnerContoller.createVenue);

router.get('/edit-venue/:id',isVenueOwner, venueOwnerContoller.getEditVenue);
router.post('/edit-venue/:id', venueOwnerContoller.editVenue);

// router.get('/venue-details/:id', venueOwnerContoller.getVenueDetails);
router.get('/delete-venue/:id',isVenueOwner, venueOwnerContoller.deleteVenue);

router.get("/show-requests",isVenueOwner, venueOwnerContoller.showVenueRequests);
router.get("/accept-request/:id",isVenueOwner, venueOwnerContoller.acceptRequest);
router.get("/reject-request/:id",isVenueOwner, venueOwnerContoller.rejectRequest);

router.get('/dashboard',isVenueOwner, venueOwnerContoller.voDashboard);



module.exports = router;