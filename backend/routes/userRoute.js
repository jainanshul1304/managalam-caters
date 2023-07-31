const express = require("express");
const { registerUser, loginUser, logOut, forgetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateUserRole, deleteUser } = require("../controllers/userController");

const { isAuthenticatedUser, authorizeRole } = require("../middlerware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logOut);
router.route("/password/forget").post(forgetPassword);
router.route("/profile").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/profile/update").put(isAuthenticatedUser, updateProfile);

router.route("/admin/user").get(isAuthenticatedUser, authorizeRole("admin"), getAllUser);
router.route("/admin/user/:id").get(isAuthenticatedUser, authorizeRole("admin"), getSingleUser)
    .put(isAuthenticatedUser, authorizeRole("admin"), updateUserRole)
    .delete(isAuthenticatedUser, authorizeRole("admin"), deleteUser);

module.exports = router


