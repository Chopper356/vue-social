const express = require('express');
const router = express.Router();
const profile = require('../controllers/profile');
const authtoken = require('../middlewares/auth');
const fileuploader = require("../middlewares/fileuploader");

router.get('/', authtoken, profile.getUserProfile);
router.get('/:id', profile.getOpenProfile);
router.post('/edit/:id', authtoken, fileuploader, profile.editProfile);
router.post('/friendadd', authtoken, profile.friendAdd);

module.exports = router;