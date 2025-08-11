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
    'https://deploy-pos-qo3n.onrender.com', // ✅ Thêm domain backend
    'http://localhost:5173', // Cho môi trường dev
    'https://localhost:5173'
];

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); // cho phép Postman hoặc curl không origin
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true,
    exposedHeaders: ['set-cookie', 'Authorization'],
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



