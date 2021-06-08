const express = require("express"),
    path = require("path");

const { check, validationResult } = require("express-validator");

const connectDB = require("./src/SiteAssets/Scripts/connection");
const Applicant = require("./src/SiteAssets/Scripts/applicant");
const { next } = require("cheerio/lib/api/traversing");

const app = express();

// MongoDB connection
connectDB();

// View engine
app.set("views", "./src/SiteAssets/views");
app.set("view engine", "ejs");

// For static files (styles)
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
    res.render("application", { title: "4th Grade Teacher" });
});

// Submission success page route
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
app.post(
    "/application/submit",
    [
        // check("_name")
        //     .notEmpty()
        //     .withMessage("First and last name cannot be empty"),
        check("_a1").matches("phrase-boundaries"),
        check("_a2").matches("policy"),
        check("_a3").matches("src-authenticity"),
        check("_a4").matches("provide-phonics"),
    ],
    (req, res) => {
        const errors = validationResult(req);
        const applicant = new Applicant(req.body);

        if (!errors.isEmpty()) {
            // return req.body;
            console.log("applicant provided wrong answer(s)");

            // applicant
            //     .end()
            //     .then((result) => {
            //         res.redirect("/submitted");
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //     });
        } else {
            console.log("right answers");
            // return res.status(400);
            // .json({ errors: errors.array() });
        }

        applicant
            .save()
            .then((result) => {
                res.redirect("/submitted");
            })
            .catch((err) => {
                console.log(err);
            });
    }
);
