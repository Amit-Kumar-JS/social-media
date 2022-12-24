const express = require('express');
const {isAuthenticated} =  require('../middlewares/auth')
const { register, login, follow, logout, updatePassword, updateProfile } = require('../controllers/User');


const router = express.Router();

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(logout);
router.route('/update/password').put(isAuthenticated, updatePassword);
router.route('/update/profile').put(isAuthenticated,updateProfile)
router.route("/follow/:id").get( isAuthenticated,follow)

module.exports = router