
const jwt = require('jsonwebtoken');
const createHttpError = require('http-errors');
const User = require('../models/userModel');
const config = require('../config/config'); 


const isVerifiedUser = async (req, res, next) => {
    try {
        // ✅ Kiểm tra token từ Authorization header trước (ưu tiên cho mobile)
        let accessToken = null;
        
        // Kiểm tra Authorization header
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            accessToken = authHeader.substring(7); // Bỏ 'Bearer ' prefix
            console.log('🔑 Token from Authorization header:', accessToken.substring(0, 20) + '...');
        }
        
        // Nếu không có Authorization header, kiểm tra cookies
        if (!accessToken) {
            accessToken = req.cookies?.accessToken;
            if (accessToken) {
                console.log('🍪 Token from cookies:', accessToken.substring(0, 20) + '...');
            }
        }
        
        if (!accessToken) {
            console.log('❌ No token found in headers or cookies');
            return next(createHttpError(401, "Please provide token!"));
        } 

        const decodeToken = jwt.verify(accessToken, config.accessTokenSecret);
        console.log('✅ Token verified for user:', decodeToken._id);

        const user = await User.findById(decodeToken._id);
        if (!user) {
            const error = createHttpError(401, "User not exist!");
            return next(error);
        }

        req.user = user;
        next();

    } catch (error) {
        console.log('❌ Token verification failed:', error.message);
        const err = createHttpError(401, "Invalid token!");
        next(err);
    }
}

module.exports = { isVerifiedUser }

;