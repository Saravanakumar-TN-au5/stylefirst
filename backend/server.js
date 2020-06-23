const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./db/connectDB');
const session = require('express-session');
const authorize = require('./middlewares/authorize');
const signRoutes = require('./routes/signRoutes');

const app = express();
connectDB();
app.use(session({
    secret: '43^tgdak6(',
    saveUninitialized: false,
    resave: false,
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 1000 * 300
    }
}));
app.use(cors());
app.use(express.json());
app.use(authorize);
app.use(signRoutes);

app.listen(process.env.PORT);