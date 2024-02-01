const mongoose = require('mongoose');

const appliedJobsSchema = new mongoose.Schema({
    user:{ type: mongoose.Schema.Types.ObjectId, ref:'user' },
    applied:[
        {
        job: {type: mongoose.Schema.Types.ObjectId, ref:'JobsList' },
        status: { type: String, default: "applied", required: true },
        // price:{ type: Number, required: true} , required: true
        }
    ]
},{timestamps: true });

module.exports = mongoose.model('appliedJobs', appliedJobsSchema);
    