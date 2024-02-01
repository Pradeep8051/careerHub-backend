const applicantEducation = require('../models/education');

exports.addEducation = (req,res) => {
    const { payload,education } = req.body;
    if(education){
        if(education._id){
            console.log("education-------4",education._id)

            applicantEducation.findOneAndUpdate(
                { user: req.user._id, "education._id": education._id }, 
                {
                    $set: {
                        "education.$": education
                    },
                }
            ).then((education) => {
                console.log("education-------5",education)

                if(education){
                    res.status(200).json({ education });
                }
            }).catch((error) => {
                console.log("education-------6",error)
                if(error) return res.status(400).json({ error });
            });
        }else{
            console.log("education-------1", education)
            applicantEducation.findOneAndUpdate(
                { user: req.user._id }, 
                {
                    $set: {
                        education: education
                    },
                },
                { new: true, upsert: true }
            ).then((education) => {
                console.log("education-------2",education)
                if(education){
                    res.status(200).json({ education });
                }
            }).catch((error) => {
                console.log("education-------3",education)
                if(error) return res.status(400).json({ error });
            });
        }
        
    }else{
        res.status(400).json({ error: 'params education required'});
    }
}

exports.getEducation = (req, res) => {
    applicantEducation.findOne({ user: req.user._id })
    .exec((error, applicantEducation) => {
        if(error) return res.status(400).json({ error });
        if(applicantEducation){
            res.status(200).json({ applicantEducation });
        }
    }) ;
}