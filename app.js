const express = require("express"),
    path = require("path");

const connectDB = require("./src/SiteAssets/Scripts/connection");
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
app.get("/application/submit", (req, res) => {
    res.render("application", { title: "Elementary School Teacher" });
});

// Submit success page route
app.get("/submitted", (req, res) => {
    res.render("submitted", { title: "Submission" });
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
app.post("/application/submit", (req, res) => {
    console.log(req.body);
    const applicant = new Applicant(req.body);

    applicant
        .save()
        .then((result) => {
            res.redirect("/submitted");
        })
        .catch((err) => {
            console.log(err);
        });
});

/////
