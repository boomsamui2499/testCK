require('dotenv/config');
const express = require('express');
const isAuth = require('./authorization/verifyToken')
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const rateLimit = require("express-rate-limit");

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use(cors());
const logger = require("./winston.js");

logger.info(`Test info Log!`);
logger.error(`Test error Log!`);

const log = require('log-to-file');
log('log date', 'my-log.log');

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
  });

const routeLogin = require('./routes/login');
const routeProduct = require('./routes/product');

app.use('/api/login', routeLogin);
app.use('/api/logout',isAuth,apiLimiter, routeLogin);
app.use('/api/product',isAuth,apiLimiter, routeProduct);



app.listen(5000, '127.0.0.1', () => console.log('Server running on port : 3000'));
