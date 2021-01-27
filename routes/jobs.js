const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const passport = require("passport");

router.get('/', async (req, res) => {
    try {
        const { title, limit, page, location, department, type, sort } = req.query;

        const query = {
            title: new RegExp(title, "i"),
            location: new RegExp(location, "i"),
            department: new RegExp(department, "i"),
            employmentType: new RegExp(type, "i"),
        }

        const results = await Job
            .find(query)
            .sort({ _id: parseInt(sort) })
            .limit(parseInt(limit))
            .skip(parseInt(limit) * parseInt(page - 1))

        const count = await Job.countDocuments(query, function (err, c) {
            if (err) {
                console.log('Error', err);
            }
        })

        res.status(200).json({ docs: results, count: count });
    } catch (err) {
        res.status(400).json({ error: "invalid request" });
    }
})

router.post("/", passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const job = new Job({
            title: req.body.title,
            location: req.body.location,
            department: req.body.department,
            employmentType: req.body.employmentType,
            aboutThisRole: req.body.aboutThisRole,
            responsibilities: req.body.responsibilities,
            requirements: req.body.requirements
        });

        const savedJob = await job.save();
        res.status(200).json(savedJob);
    } catch (err) {
        res.status(400).json({ error: "invalid request" });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        res.status(200).json(job);
    } catch (err) {
        res.status(400).json({ error: "invalid request" });
    }
})

module.exports = router;