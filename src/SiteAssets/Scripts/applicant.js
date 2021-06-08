const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicantSchema = new Schema(
    {
        _id: Number,
        _name: {
            type: String,
            required: true,
        },
        _q1: {
            type: String,
            required: true,
        },
        _a1: {
            type: String,
            required: true,
        },
        _q2: {
            type: String,
            required: true,
        },
        _a2: {
            type: String,
            required: true,
        },
        _q3: {
            type: String,
            required: true,
        },
        _a3: {
            type: String,
            required: true,
        },
        _q4: {
            type: String,
            required: true,
        },
        _a4: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Applicant = mongoose.model("Applicant", applicantSchema);

module.exports = Applicant;
