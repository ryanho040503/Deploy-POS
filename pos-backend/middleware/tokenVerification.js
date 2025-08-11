
const jwt = require('jsonwebtoken');
const createHttpError = require('http-errors');
const User = require('../models/userModel');
const config = require('../config/config'); 


const isVerifiedUser = async (req, res, next) => {
    try {

        // const { accessToken } = req.cookies;
        const { accessToken } = req.cookies || {};
        
        if (!accessToken) {
            return next(createHttpError(401, "Please provide token!"));
        } 

        const decodeToken = jwt.verify(accessToken, config.accessTokenSecret);

        const user = await User.findById(decodeToken._id);
        if (!user) {
            const error = createHttpError(401, "User not exist!");
            return next(error);
        }

        req.user = user;
        next();

    } catch (error) {
        const err = createHttpError(401, "Invalid token!");
        next(err);
    }
}

module.exports = { isVerifiedUser }

;