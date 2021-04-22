const express = require('express');
const router = express.Router();
const profile = require('../controllers/user');
const authtoken = require('../middlewares/auth');

router.get('/profile', authtoken, profile.getUserProfile);

module.exports = router;