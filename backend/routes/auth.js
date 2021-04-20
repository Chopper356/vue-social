const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');

router.post('/', auth.signUp);

module.exports = router;