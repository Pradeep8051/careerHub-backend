const express = require("express");
const app = express();
const User = require('../models/user');
const jwt = require("jsonwebtoken");
const multer = require('multer');
// const shortid = require('shortid');
const path = require('path'); 
const ShortUniqueId = require("short-unique-id");
const Employer = require("../models/Employer");

const uid = new ShortUniqueId();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname)+'/uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, uid.stamp(32) + '-' + file.originalname)
    }
  })
   
exports.upload = multer({ storage: storage })

app.use(express.json());

// checking token
exports.requireSignin = (req, res, next) => {
    if(req.headers.authorization){
            const token = req.headers.authorization;
            const user = jwt.verify(token, process.env.JWT_SECRET);
            req.user = user;
            console.log("getAppliedJobs----",user)
            // res.status(201).json({ message: token});        
    }else{
        return res.status(401).json({ message: "Authorization is required"});
    }
    
    next();
    
}

exports.employerMiddleware = async (req , res, next) =>{
    try{
        const user = await Employer.findOne({_id: req.user._id});
        req.user = user;
        // req.body.jobs["_id"] = user._id;
        if(user.type !== 'employer'){
            return res.status(400).json({ message: 'Employer Access denied' });
        }else{
            console.log("employerMiddleware-------2",user)
            next();
        }
    }catch(e){
        console.log("employerMiddleware-------",e)
        res.status(401).send(e);
    }
}

exports.userMiddleware = async (req , res, next) =>{
    try{
        const user = await User.findOne({_id: req.user._id});
        req.user = user;
        // if(user.type !== 'employee'){
        //     return res.status(400).json({ message: 'admin Access denied' });
        // }else{
            next();
        // }
    }catch(e){
        res.status(401).send({"error":"something went wrong "});
    }
}

exports.adminMiddleware = async (req , res, next) =>{
    try{
        const user = await User.findOne({_id: req.user._id});
        req.user = user;
        if(user.type !== 'admin'){
            return res.status(400).json({ message: 'admin Access denied' });
        }else{
            next();
        }
    }catch(e){
        res.status(401).send({"error":"something went wrong "});
    }
}