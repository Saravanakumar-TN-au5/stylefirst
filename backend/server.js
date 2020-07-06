const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./db/connectDB');
const session = require('express-session');
const authorize = require('./middlewares/authorize');
const signRoutes = require('./routes/signRoutes');
const prodRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
connectDB();
app.use(cors({
    credentials:true,
    origin: ['http://localhost:3000']
}));
app.use(express.json());
app.use(session({
    secret: '43^tgdak6',
    saveUninitialized: true,
    resave: true,
    cookie: {
        path: '/',
        httpOnly: true
    }
}));
//app.use(authorize);
app.use(signRoutes);
app.use(prodRoutes);
app.use(userRoutes);

app.listen(process.env.PORT);