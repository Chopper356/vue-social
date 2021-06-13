const express = require('express');
const router = express.Router();
const post = require('../controllers/post');
const authtoken = require('../middlewares/auth');
const fileuploader = require("../middlewares/fileuploader");

router.post('/create', authtoken, fileuploader, post.create);
router.post('/like', authtoken, post.like);
router.post('/:id/delete', authtoken, post.delete);
router.post('/:id/edit', authtoken, post.edit);
router.get('/:id/likes', post.showLikes);
// router.get('/all', post.getAll);
router.get('/:id/:page', post.getPostsByPage);
router.get('/:id', post.getPostPage);

module.exports = router;