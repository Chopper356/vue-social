const express = require('express');
const router = express.Router();

const Post = require('./posts');
const Auth = require("./auth");
const User = require("./user");
const Users = require("./users");

router.use("/api/auth", Auth);
router.use("/api/post", Post);
router.use("/api/user", User);
router.use("/api/users", Users);

module.exports = router;