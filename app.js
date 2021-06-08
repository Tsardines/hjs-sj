const express = require("express");
const connectDB = require("./src/SiteAssets/Scripts/connection");
const path = require("path");
const Applicant = require("./src/SiteAssets/Scripts/applicant");

const app = express();

// MongoDB connection
connectDB();

// View engine
app.set("views", "./src/SiteAssets/views");
app.set("view engine", "ejs");

// Middleware for static files (styles)
app.use(express.static(path.join(__dirname + "/public")));
app.use(express.urlencoded({ extended: true })); // parses applicant answers

const Port = process.env.Port || 3000;
app.listen(Port, () => console.log("Server started..."));

/**
 * @GET
 */

// Home page route
app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

// Application page route
app.get("/application", (req, res) => {
    res.render("application", { title: "Elementary School Teacher" });
});

// Admin page route
app.get("/admin", (req, res) => {
    Applicant.find()
        .sort({ createdAt: -1 })
        .then((result) => {
            res.render("admin", { title: "Admin Viewer", applicants: result });
        })
        .catch((err) => {
            console.log(err);
        });
});

/**
 * @POST
 */

// Applic. page submit
app.post("/application", (req, res) => {
    console.log(req.body);
});
