const express = require('express');
const router = express.Router();
const post = require('../controllers/post');
const authtoken = require('../middlewares/auth');
const fileuploader = require("../middlewares/fileuploader");

router.post('/create', authtoken, fileuploader, post.create);
router.post('/like', authtoken, post.like);
router.get('/all', post.getAll);

module.exports = router;