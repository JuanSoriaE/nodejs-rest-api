const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('[+] Database connected!');
    } catch (error) {
        console.error('[-] Something went wrong in the DB connection. ' + error)
    }
}

module.exports = connectDB;