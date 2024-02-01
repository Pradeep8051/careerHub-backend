const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "EmployerDetails",
    },
    openingType: {
      type: String,
      required: true,
      min: 3,
      max: 50,
    },
    nameDepartments: {
      type: String,
      required: true,
      trim: true,
    },
    opening: {
      type: Number,
      required: true,
      trim: true,
    },
    feeType: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
    certification: {
      type: String,
      required: true,
      trim: true,
    },
    paidAmt: {
      type: Number,
      trim: true,
      default: 0,
    },
    stipend: {
      type: Number,
      trim: true,
      default: 0,
    },
    description: {
      type: String,
      required: true,
      min: 10,
    },
    jobType: {
      type: String,
      default: "fullTime",
    },
    experience: {
      type: String,
      default: "0-1",
    },
    image: {
      type: String,
    },
    language: {
      type: String,
      default: "english",
    },
  },
  { timestamps: true }
);

// const applicantEducationSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref: 'User'
//     },
//     education : [educationSchema],

// },{timestamps: true });
module.exports = mongoose.model("JobsList", jobsSchema);
