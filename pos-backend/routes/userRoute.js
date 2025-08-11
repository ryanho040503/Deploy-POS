const express = require('express');
const router = express.Router();


const { registerUser, login, logout} = require('../controllers/userControllers');
const { isVerifiedUser } = require('../middleware/tokenVerification');
const { getUserData } = require('../controllers/userControllers'); 


// Authentication routes
router.route('/register').post(registerUser);
router.route('/login').post(login);
router.route('/logout').post(logout); // ✅ Bỏ middleware vì user có thể logout mà không cần token
router.route('/').get(isVerifiedUser, getUserData);
router.route('/').post(isVerifiedUser, getUserData); // Assuming you want to use POST for getting user data

module.exports = router;