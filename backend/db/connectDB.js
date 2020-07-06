const mongoose = require('mongoose');

const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-dn9sr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const connectDB = () => {
    try {
        mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;