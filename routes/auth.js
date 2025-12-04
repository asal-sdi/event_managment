const {Router} = require('express');
const authController = require('../controllers/authController');
const router = Router();

// User routes :/auth/user-***
router.get('/user-register', authController.getRegister);
router.post('/user-register', authController.register);

router.get('/user-login', authController.getUserLogin)
router.post('/user-login' , authController.handleUserLogin)

// Event Manager routes :/auth/em-***
router.get('/em-register', authController.getEmRegister);
router.post('/em-register', authController.EmRegister);

router.get('/em-login', authController.getEmLogin);
router.post('/em-login' , authController.handleEmLogin)

// Venue Owner routes :/auth/vo-***
router.get('/vo-register', authController.getVoRegister);
router.post('/vo-register', authController.VoRegister);

router.get('/vo-login', authController.getVoLogin);
router.post('/vo-login' , authController.handleVoLogin)

module.exports = router;