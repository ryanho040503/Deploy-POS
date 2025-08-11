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
    'http://localhost:5173', // Cho môi trường dev
    'https://localhost:5173'
];

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies
// app.use(cors({
//     credentials: true,
//     // origin: ['https://localhost:5173']
//     // origin: allowedOrigins,
//     origin: function (origin, callback) {
//         // Cho phép requests không có origin (như mobile apps hoặc curl requests)
//         if (!origin) return callback(null, true);

//         // Kiểm tra nếu origin kết thúc bằng domain được phép (cho subdomains)
//         const isAllowed = allowedOrigins.some(allowed => 
//             origin === allowed || 
//             origin.startsWith(allowed.replace('https://', 'http://')) ||
//             origin.startsWith(allowed.replace('http://', 'https://'))
//         );


//         if (allowedOrigins.indexOf(origin) === -1) {
//             const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//             return callback(new Error(msg), false);
//         }
//         return callback(null, true);
//     },
//     allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     credentials: true
// }));

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); // Cho phép request không có origin (Postman, curl)

        const isAllowed = allowedOrigins.includes(origin);
        if (!isAllowed) {
            return callback(new Error('Not allowed by CORS'), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true,
    exposedHeaders: ['set-cookie', 'Authorization'],
}));

app.use(cookieParser());

app.options('*', cors()); // Preflight cho tất cả route

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



