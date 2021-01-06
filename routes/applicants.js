const express = require('express');
const router = express.Router();
const Applicant = require('../models/Applicant');
var ImageKit = require("imagekit");
require("dotenv").config();
const passport = require("passport");

const PRIVATE_KEY = process.env.PRIVATE_KEY
const PUBLIC_KEY = process.env.PUBLIC_KEY
const URL_ENDPOINT = process.env.URL_ENDPOINT

router.get('/auth', async (req, res) => {
    try {
        var imagekit = new ImageKit({
            publicKey: PUBLIC_KEY,
            privateKey: PRIVATE_KEY,
            urlEndpoint: URL_ENDPOINT
        });

        var authenticationParameters = imagekit.getAuthenticationParameters();
        res.status(200).json(authenticationParameters);
    } catch (err) {
        res.status(400).json({ error: "invalid request" });
    }
})

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const { firstname, limit, page, lastname } = req.query;

        const query = {
            firstName: new RegExp(firstname, "i"),
            lastName: new RegExp(lastname, "i"),
        }

        const results = await Applicant
            .find(query)
            .limit(parseInt(limit))
            .skip(parseInt(limit) * parseInt(page - 1))

        const count = await Applicant.countDocuments(query, function (err, c) {
            if (err) {
                console.log('Error', err);
            }
        })

        res.status(200).json({ docs: results, count: count });
    } catch (err) {
        res.status(400).json({ error: "invalid request" });
    }
})

router.post('/', async (req, res) => {
    try {
        var imagekit = new ImageKit({
            publicKey: PUBLIC_KEY,
            privateKey: PRIVATE_KEY,
            urlEndpoint: URL_ENDPOINT
        });

        let base64Doc = await req.body.resume.base64Str;

        let resumeUrl;
        await imagekit.upload({
            file: base64Doc,
            fileName: req.body.resume.fileName,
            folder: "/resumes"
        }).then(res => {
            resumeUrl = res.url;
            // console.log(res);
        }).catch(error => console.log(error));

        const applicant = new Applicant({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            resumeUrl: resumeUrl,
            job: { title: req.body.job.title, id: req.body.job.id }
        });

        const savedApplicant = await applicant.save();
        res.status(200).json(savedApplicant);
    } catch (err) {
        res.status(400).json({ error: "invalid request" });
    }
})


module.exports = router;