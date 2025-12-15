const {Router} = require('express');
const venueOwnerContoller = require('../controllers/venueOwnerController');
const router = Router();

router.get('/dashboard', venueOwnerContoller.voDashboard);

router.get('/create-venue', venueOwnerContoller.getCreateVenue);
router.post('/create-venue', venueOwnerContoller.createVenue);

router.get('/edit-venue/:venueId', venueOwnerContoller.getEditVenue);
router.post('/edit-venue/:venueId', venueOwnerContoller.editVenue);

router.get('/delete-venue/:venueId', venueOwnerContoller.deleteVenue);

module.exports = router;