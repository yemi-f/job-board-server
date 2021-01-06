const express = require('express');
const router = express.Router();
const Job = require('../models/Job');


router.get('/', async (req, res) => {
    try {
        const { title, limit, page, location, department, type } = req.query;

        const query = {
            title: new RegExp(title, "i"),
            location: new RegExp(location, "i"),
            department: new RegExp(department, "i"),
            employmentType: new RegExp(type, "i"),
        }

        const results = await Job
            .find(query)
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

router.get('/count', async (req, res) => {
    try {
        const results = await Job.countDocuments({});

        res.status(200).json({ numOfDocuments: results });
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