const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const authtoken = require('../middlewares/auth');

router.get('/', users.show);

module.exports = router;