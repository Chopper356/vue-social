const express = require('express');
const router = express.Router();
const path = require("path");

const Post = require('./posts');
const Auth = require("./auth");
const Profile = require("./profile");
const Users = require("./users");
const Comment = require("./comment");

router.use("/api/auth", Auth);
router.use("/api/post", Post);
router.use("/api/profile", Profile);
router.use("/api/users", Users);
router.use("/api/comment", Comment);

const frontend = path.resolve(__dirname, "../../", "frontend", "dist");
router.use(express.static(frontend));
router.get("*", (req, res) => res.sendFile(path.resolve(frontend, "index.html")));

module.exports = router;