const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  class: String,
  name: String,
  country: String,
  state: String,
  district: String,
  city: String,
  pincode: String,
});

const educationSchema = new mongoose.Schema({
  class:{ type: classSchema },
  anyDegree: { type: classSchema, required: true },
  stream: {
    type: String,
    required: true,
    trim: true,
  },
  degree: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  othercertification: {
    type: String,
  },
  otherexperience: {
    type: String,
  },
});

const applicantEducationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    education: educationSchema,
  },
  { timestamps: true }
);
module.exports = mongoose.model("ApplicantEducation", applicantEducationSchema);
