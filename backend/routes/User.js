const express = require('express');
const {isAuthenticated} =  require('../middlewares/auth')
const { register, login, follow } = require('../controllers/User');


const router = express.Router();

router.route('/register').post(register)
router.route('/login').post(login)
router.route("/follow/:id").get( isAuthenticated,follow)

module.exports = router