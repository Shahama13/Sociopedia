import express from "express"
import { deleteMyProfile, followUser,getallMyPosts,getUserPosts, forgotpassword, getAllUsers, getUserProfile, login, logout, myProfile, register, resetPassword, updatePassword, updateProfile } from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)

router.route("/me").get(isAuthenticated, myProfile)
router.route("/my/posts").get(isAuthenticated,getallMyPosts)

router.route("/update/password").put(isAuthenticated, updatePassword)
router.route("/update/profile").put(isAuthenticated, updateProfile)

// BUG here
router.route("/delete/me").delete(isAuthenticated, deleteMyProfile)

router.route("/user/:id").get(isAuthenticated,getUserProfile)
router.route("/users").get(isAuthenticated,getAllUsers)
router.route("/follow/:id").get(isAuthenticated, followUser)
router.route("/userposts/:id").get(isAuthenticated, getUserPosts)

// MOST IMPORTANT
router.route("/forgot/password").post(forgotpassword)
router.route("/password/reset/:token").put(resetPassword)

export default router;