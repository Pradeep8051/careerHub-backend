const express = require("express");
const { requireSignin, userMiddleware, employerMiddleware } = require("../com_middleware");
const { addEducation, getEducation } = require("../controllers/education");
const { addJobs, getJobsList, updateJob, getJobDetail } = require("../controllers/Jobs");
const Router = express.Router();


Router.post('/addJobs', requireSignin, employerMiddleware, addJobs);
Router.post('/updateJob', requireSignin, employerMiddleware, updateJob);
Router.post('/getJobDetail', getJobDetail);
Router.get('/getJobsList', getJobsList);

//   requireSignin, userMiddleware,
module.exports = Router;