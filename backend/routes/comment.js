const express = require('express');
const router = express.Router();
const comment = require('../controllers/comment');
const authtoken = require('../middlewares/auth');

router.post('/create', authtoken, comment.create);
router.get('/:post', comment.getCommentsForPost);

module.exports = router;