const express = require("express");
const {
  createPost,
  likeUnlikePost,
  deletePost,
  getPostOfFollowing,
  upadateCaption,
  addComment,
  deleteComment,
} = require("../controllers/Post");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router
  .route("/post/:id")
  .get(isAuthenticated, likeUnlikePost)
  .put(isAuthenticated, upadateCaption)
  .delete(isAuthenticated, deletePost);
router.route("/post/upload").post(isAuthenticated, createPost);

router.route("/posts").get(isAuthenticated, getPostOfFollowing);
router
  .route("/post/comment/:id")
  .put(isAuthenticated, addComment)
  .delete(isAuthenticated, deleteComment);
module.exports = router;
