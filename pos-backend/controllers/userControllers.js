const createHttpError = require('http-errors');
const User = require('../models/userModel'); // Assuming you have a User model defined
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config'); // Assuming you have a config file for environment variables

const registerUser = async (req, res, next) => {

    console.log("📥 Request đã vào controller registerUser"); // ✅ Dòng test

    try {
        const { name, phone, email, password, role } = req.body;

        if (!name || !phone || !email || !password || !role) {
            const error = createHttpError(400, "All fields are required");
            return next(error);
        }

        const isUserPresent = await User.findOne({ email });

        if (isUserPresent) {
            const error = createHttpError(400, "User already exists");
            return next(error);
        }

        // const user = await User.create({ name, phone, email, password, role });
        // const newUser = User(user);
        // await newUser.save();
        // res.status(201).json({
        //     success: true,
        //     message: "User registered successfully",
        //     data: newUser
        // });

        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);

        // const newUser = await User.create({ 
        //     name, 
        //     phone, 
        //     email, 
        //     password: hashedPassword, 
        //     role 
        // });

        const newUser = await User.create({ name, phone, email, password, role });


        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: newUser
        });


    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {

    try {

        const { email, password } = req.body;
        console.log("📥 req.body:", req.body);  // Đây để kiểm tra dữ liệu request gửi lên

        if (!email || !password) {
            const error = createHttpError(400, "Email and password are required");
            return next(error);
        }

        const userLogin = await User.findOne({ email });
        if (!userLogin) {
            const error = createHttpError(404, "User not found");
            return next(error);
        }

        const isMatch = await bcrypt.compare(password, userLogin.password);
        if (!isMatch) {
            const error = createHttpError(401, "Invalid credentials");
            return next(error);
        }

        const accessToken = jwt.sign({ _id: userLogin._id }, config.accessTokenSecret, {
            expiresIn: '1d'
        });

        // ✅ Cập nhật cookie settings cho mobile compatibility
        const cookieOptions = {
            maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            path: '/',
            domain: undefined // ✅ Để browser tự động set domain
        };

        // ✅ Kiểm tra User-Agent để điều chỉnh cookie settings
        const userAgent = req.headers['user-agent'] || '';
        const isMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        
        if (isMobile) {
            // ✅ Điều chỉnh cho mobile devices
            cookieOptions.sameSite = 'lax'; // ✅ Thay đổi từ 'none' sang 'lax' cho mobile
            console.log('📱 Mobile device detected, using lax sameSite');
        }

        res.cookie('accessToken', accessToken, cookieOptions);

        res.status(200).json({
            success: true, 
            message: "Login successful",
            data: userLogin,
            token: accessToken
        });

    } catch (error) {
        next(error);
    }

}

const getUserData = async (req, res, next) => {

    try {

        const user = await User.findById(req.user._id);
        res.status(200).json({
            success: true,
            data: user
        })

    } catch (error) {

        next(error);

    }

}

const logout = async (req, res, next) => {
    try {
        // ✅ Cập nhật cookie options cho logout
        const cookieOptions = {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            path: '/',
            domain: undefined
        };

        // ✅ Kiểm tra User-Agent để điều chỉnh cookie settings
        const userAgent = req.headers['user-agent'] || '';
        const isMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        
        if (isMobile) {
            cookieOptions.sameSite = 'lax';
        }

        res.clearCookie('accessToken', cookieOptions);
        res.status(200).json({ success: true, message: "User logout succesfully!" });
    } catch (error) {
        next(error);
    }
}

module.exports = { registerUser, login, logout, getUserData };