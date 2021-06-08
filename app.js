const express = require("express");
const connectDB = require("./src/SiteAssets/Scripts/connection.js");
const path = require("path");
const app = express();

connectDB();

// view engine
app.set("views", "./src/SiteAssets/views");
app.set("view engine", "ejs");

// styles
app.use(express.static(path.join(__dirname + "/public")));

const Port = process.env.Port || 3000;

app.listen(Port, () => console.log("Server started..."));

app.get("/", (req, res) => {
    res.render("index", { title: "Elementary School Teacher" });
});

app.get("/admin", (req, res) => {
    res.render("admin", { title: "Admin Viewer" });
});
