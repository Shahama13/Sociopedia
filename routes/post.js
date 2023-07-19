import express from "express"
import { commentOnPost, createPost, deleteComment, deletePost, getLikesOfPost, getPostOfFollowing, likeUnlikePost, updateCaption } from "../controllers/post.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.route("/post/upload").post(isAuthenticated, createPost)
router.route("/post/:id")
    .get(isAuthenticated, likeUnlikePost)
    .put(isAuthenticated, updateCaption)
    .delete(isAuthenticated, deletePost)

router.route("/posts").get(isAuthenticated, getPostOfFollowing)
router.route("/postslike/:id").get(isAuthenticated, getLikesOfPost)
router.route("/posts/comment/:id")
    .put(isAuthenticated, commentOnPost)
    .delete(isAuthenticated, deleteComment)

export default router;