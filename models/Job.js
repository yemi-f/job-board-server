const mongoose = require('mongoose');

const JobSchema = mongoose.Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    department: { type: String, required: true },
    employmentType: { type: String, required: true },
    aboutThisRole: { type: String, required: true },
    responsibilities: [{ type: String, required: true }],
    requirements: [{ type: String, required: true }]
})

module.exports = mongoose.model("Job", JobSchema)