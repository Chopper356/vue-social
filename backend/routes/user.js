const express = require('express');
const router = express.Router();
const profile = require('../controllers/user');
const authtoken = require('../middlewares/auth');

router.get('/profile', authtoken, profile.getUserProfile);
router.get('/profile/:id', profile.getOpenProfile);

module.exports = router;