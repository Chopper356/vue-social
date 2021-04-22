const express = require('express');
const router = express.Router();

const Post = require('./posts');
const Auth = require("./auth");
const User = require("./user");

router.use("/api/auth", Auth);
router.use("/api/post", Post);
router.use("/api/user", User);

module.exports = router;