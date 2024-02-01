const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
    class:{ 
        type: String, 
        required: true, 
        min: 3, 
        max: 50
     },
     stream: { 
        type: String, 
        required: true,
        trim: true 
     },
     degree: { 
        type: String, 
        required: true,
        trim: true 
     },
     status: { 
        type: String, 
        required: true,
        trim: true 
     },
     year: { 
        type: Number, 
        required: true,
        trim: true
     },
     course: { 
        type: String, 
        required: true,
        trim: true 
     },
     otherdegree: { 
        type: String, 
        trim: true 
     },
     othercertification: { 
        type: String, 
        min: 10,
        max: 100
    },
    otherexperience: { 
        type: String, 
        required: true,
        trim: true 
    },
});

const applicantEducationSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User'
    },
    education : [educationSchema],
    
},{timestamps: true });
module.exports = mongoose.model('ApplicantEducation', applicantEducationSchema);
    