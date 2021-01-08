# job-board-server 
This project makes use of [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/), [MongoDB](https://www.mongodb.com/), [Mongoose](https://mongoosejs.com/).

REST API deployed to Heroku https://job-board-xc23d56.herokuapp.com/


## Install
### `npm install`
Runs the app in the development mode.
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

The server will automatically restart if you make edits.

## Run the app locally
### `npm run dev`
Runs the app in the development mode.
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

The server will automatically restart if you make edits.

## Usage
Add a .env file at the root of the project directory with the following contents:
 - MONGODB_URI 
 - PUBLIC_KEY (*from* imagekit.io)
 - PRIVATE_KEY (*from* imagekit.io)
 - URL_ENDPOINT (*from* imagekit.io) 
 - ACCESS_TOKEN_SECRET


## API endpoints
### JOBS

 - `GET /jobs` - get all the jobs
 - `GET /jobs/:id` - gets a job with unique ID
 - `POST /jobs` - adds a new job
 - There are 5 *optional* query parameters

| Query parameter  	|  Description 	|   Type	|
|---	|---	|---	|
| `title`  	| Job title (e.g. "engineer", "analyst")  	| String 	|
| `location`  	| Job location (e.g. "Hamilton", "BC", "Waterloo")  	| String 	|
| `department`  	|  Job department (e.g. "finance", "business", "engineering") 	| String 	|
| `type`  	|   Employment type (e.g. "full-time", "part-time", "contract")	| String 	|
| `limit`  	|  Number of jobs to return 	| Integer  	|
| `page`  	|  Offset the list of returned jobs by this amount * `limit` 	| Integer  	|

### APPLICANTS

 - `GET /applicants` - get all submitted job applications
 - `POST /applicants` - adds a new applicant

### USERS

 - `GET /users` - get all users
 - `POST /users/signup` - creates a new user
 - `POST /users/signin` - sign in 
 - `GET /users/logout` - sign out
