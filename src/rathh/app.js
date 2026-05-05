import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import eventDetailsRoutes from './routes/eventDetailsRoutes.js';
import bookingDetailsRoutes from './routes/bookingDetailsRoutes.js';
import userDetailsRoutes from './routes/userDetailsRoutes.js';

const app = express();

const exactOrigins = [
    'http://localhost:3000',
    'http://localhost:5500',
    'http://127.0.0.1:5500'
];
const localOriginRegexes = [
    /^http:\/\/localhost:\d+$/,
    /^http:\/\/127\.0\.0\.1:\d+$/,
    /^https:\/\/localhost:\d+$/,
    /^https:\/\/127\.0\.0\.1:\d+$/
];
const allowedDomainRegexes = [
    /^https:\/\/(.*\.)?holistichealervedika\.com$/,
    /^https:\/\/(.*\.)?rathhindia\.in$/,
    /^https:\/\/(.*\.)?taleeolearning\.com$/,
    /^https:\/\/(.*\.)?taleeolearning\.in$/
];

app.use(cookieParser());
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) {
            return callback(null, true);
        }
        if (exactOrigins.includes(origin)) {
            return callback(null, true);
        }
        const isLocalAllowed = localOriginRegexes.some(regex => regex.test(origin));
        if (isLocalAllowed) {
            return callback(null, true);
        }
        const isAllowedDomain = allowedDomainRegexes.some(regex => regex.test(origin));
        if (isAllowedDomain) {
            return callback(null, true);
        }
        callback(new Error('Not allowed by CORS'));
    },
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(bodyParser.json());

// 🌟 INJECT CLIENT NAME MIDDLEWARE
app.use((req, res, next) => {
    req.clientName = 'rathh';
    next();
});

app.get('/', (req, res) => res.send(`API is running for ${req.clientName}...`));

// Mount eventdetails routes for CRUD operations
app.use('/eventdetails', eventDetailsRoutes);
// Mount bookingdetails routes for CRUD operations
app.use('/bookingdetails', bookingDetailsRoutes);
// Mount userdetails and auth routes
app.use('/userdetails', userDetailsRoutes);

// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled API error:', err);
    if (res.headersSent) {
        return next(err);
    }
    const status = Number(err?.status || err?.statusCode || 500);
    return res.status(status).json({
        message: err?.message || 'Internal server error'
    });
});

export default app;
