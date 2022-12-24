const express = require("express");
const { createPost, likeUnlikePost, deletePost, getPostOfFollowing } = require("../controllers/Post");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.route("/post/:id").get(isAuthenticated, likeUnlikePost).delete(isAuthenticated , deletePost);
router.route("/post/upload").post(isAuthenticated, createPost);

router.route("/posts").get(isAuthenticated , getPostOfFollowing)
module.exports = router  