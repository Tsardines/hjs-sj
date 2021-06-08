const mongoose = require("mongoose");

const URI =
    "mongodb+srv://testuser:test123@sj-teacher-qs.dy2fa.mongodb.net/sj-data?retryWrites=true&w=majority";

const connectDB = async () => {
    await mongoose.connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
    console.log("db");
};

module.exports = connectDB;
