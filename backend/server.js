const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./db/connectDB');
const session = require('express-session');
const authorize = require('./middlewares/authorize');
const signRoutes = require('./routes/signRoutes');
const prodRoutes = require('./routes/productRoutes');

const app = express();
connectDB();
app.use(cors({
    credentials:true,
    origin: ['http://localhost:3000']
}));
app.use(express.json());
app.use(session({
    secret: '43^tgdak6',
    saveUninitialized: false,
    resave: false,
    cookie: {
        path: '/',
        httpOnly: true
    }
}));
//app.use(authorize);
app.use(signRoutes);
app.use(prodRoutes);

app.listen(process.env.PORT);