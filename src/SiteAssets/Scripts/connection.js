const mongoose = require("mongoose");

const URI =
    "mongodb+srv://testuser:test123@sj-teacher-qs.dy2fa.mongodb.net/sj-data?retryWrites=true&w=majority";

const connectDB = async () => {
    await mongoose
        .connect(URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        .then((res) => console.log("connected to db"))
        .catch((err) => console.log(err));
};

module.exports = connectDB;
