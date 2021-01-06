const mongoose = require('mongoose');

const ApplicantSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    resume: {
        base64Str: String,
        fileName: String
    },
    resumeUrl: { type: String },
    job: {
        title: String,
        id: String
    }
})

module.exports = mongoose.model("Applicant", ApplicantSchema)