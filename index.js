const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const expressSession = require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
});
require('dotenv').config();
require("./auth/auth");
// const uri = "mongodb://127.0.0.1:27017/db-job-board";
// const uri = process.env.CONNECTION_STRING;
const uri = process.env.MONGODB_URI;

const port = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(expressSession);


//import routes
const applicantsRoute = require('./routes/applicants');
const jobsRoute = require("./routes/jobs");
const usersRoute = require("./routes/users");
app.use('/applicants', applicantsRoute);
app.use("/jobs", jobsRoute);
app.use("/users", usersRoute);

app.use(passport.initialize());
app.use(passport.session());



//routes
app.get('/', (req, res) => {
    res.send("This is home");
})

//connect to db
mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false },
    () => console.log("connected to db")
);


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
