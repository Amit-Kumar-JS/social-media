const express = require('express');
const {isAuthenticated} =  require('../middlewares/auth')
const { register, login, follow, logout, updatePassword, updateProfile, deleteProfile, myProfile, getAllUsers, userProfile, forgotPassword } = require('../controllers/User');


const router = express.Router();

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(logout);
router.route('/update/password').put(isAuthenticated, updatePassword);
router.route('/update/profile').put(isAuthenticated,updateProfile)
router.route("/follow/:id").get( isAuthenticated,follow)
router.route("/me").get( isAuthenticated,myProfile)
router.route("/delete/me").delete(isAuthenticated, deleteProfile)
router.route("/user/:id").get(isAuthenticated, userProfile)
router.route("/users").get(isAuthenticated, getAllUsers)
router.route("/forgot/password").post(isAuthenticated , forgotPassword)

module.exports = router