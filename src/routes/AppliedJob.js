const express = require("express");
const { requireSignin, userMiddleware, adminMiddleware, employerMiddleware } = require("../com_middleware");
// const { addItemToCart, getCartItems } = require("../controllers/cart");
const AppliedJob = require("../models/AppliedJob");
const { AppliedJobs, getAppliedJobs, getCreatedJobs, getUserListAppliedJob } = require("../controllers/AppliedJob");
const Router = express.Router();


Router.post('/appliedJob', requireSignin, userMiddleware, AppliedJobs);
Router.get('/getAppliedJobs', requireSignin, userMiddleware, getAppliedJobs);
Router.get('/getCreatedJobs', requireSignin, employerMiddleware, getCreatedJobs);
Router.post('/getUserListAppliedJob', requireSignin, employerMiddleware, getUserListAppliedJob);

//   requireSignin, userMiddleware,

//new update
// router.post("/user/cart/removeItem", requireSignin, userMiddleware, removeCartItems);

module.exports = Router;