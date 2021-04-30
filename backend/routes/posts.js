const express = require('express');
const router = express.Router();
const post = require('../controllers/post');
const authtoken = require('../middlewares/auth');

router.post('/create', authtoken, post.create);
router.post('/like', authtoken, post.like);
router.get('/all', post.getAll);

module.exports = router;