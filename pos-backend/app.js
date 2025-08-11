require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const config = require('./config/config');
const globalErrorHandler = require('./middleware/globalErrorHandler');
const createHttpError = require('http-errors');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');




const PORT = process.env.PORT;
connectDB();

const allowedOrigins = [
    'https://subtle-mousse-6f050b.netlify.app',
    'https://deploy-pos-qo3n.onrender.com',
    'http://localhost:5173',
    'https://localhost:5173',
    // ✅ Thêm các domain có thể có của Netlify
    'https://*.netlify.app',
    'https://*.netlify.com'
];

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies

// ✅ Thêm middleware để log request và detect mobile
app.use((req, res, next) => {
    const userAgent = req.headers['user-agent'] || '';
    const isMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const origin = req.headers.origin || 'No origin';
    
    console.log(`📱 Request from: ${origin} | Mobile: ${isMobile} | Method: ${req.method} | Path: ${req.path}`);
    
    next();
});

app.use(cors({
    origin: function (origin, callback) {
        // ✅ Cho phép tất cả requests không có origin (mobile apps, Safari private mode)
        if (!origin) return callback(null, true);
        
        // ✅ Kiểm tra domain chính xác
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        
        // ✅ Kiểm tra subdomain của Netlify
        if (origin.includes('netlify.app') || origin.includes('netlify.com')) {
            return callback(null, true);
        }
        
        // ✅ Cho phép localhost cho development
        if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
            return callback(null, true);
        }
        
        console.log('❌ CORS blocked origin:', origin);
        callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    credentials: true,
    exposedHeaders: ['set-cookie', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'https://subtle-mousse-6f050b.netlify.app');
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   next();
// });

// Root Endpoint
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the POS system backend server!" });
});

// Other end points 
app.use('/api/user', require('./routes/userRoute'));
app.use('/api/order', require('./routes/orderRoute'));
app.use('/api/table', require('./routes/tableRoute'));

//Global Error Handler
app.use(globalErrorHandler)

// Start the server 
app.listen(PORT, () => {
    console.log(`✅ POS Server is running on port ${PORT}`);
})



