const {Router} = require('express');
const venueOwnerContoller = require('../controllers/venueOwnerController');
const router = Router();

router.get('/dashboard', venueOwnerContoller.voDashboard);

module.exports = router;