const Jobs = require("../models/Jobs");

exports.addJobs = (req, res) => {
  const { jobs } = req.body;
  if (jobs) {
    const {
      openingType,
      nameDepartments,
      opening,
      feeType,
      date,
      certification,
      stipend,
      description,
      jobType,
      experience,
      paidAmt,
      image,
      language
    } = jobs;

    const newJob = new Jobs({
      user: req.user._id,
      openingType,
      nameDepartments,
      opening,
      feeType,
      date,
      certification,
      stipend,
      description,
      jobType,
      experience,
      paidAmt,
      image,
      language
    });

    newJob
      .save()
      .then((savedJob) => {
        if (savedJob) {
          res.status(200).json({ savedJob });
        }
      })
      .catch((error) => {
        if (error) return res.status(400).json({ error });
      });
  } else {
    res.status(400).json({ error: "params education required" });
  }
};

exports.updateJob = (req, res) => {
  const { jobs } = req.body;

  if (jobs?._id) {
    Jobs.findOneAndUpdate(
      { user: req.user._id, "_id": jobs._id },
      {
        $set: jobs,
      }
    )
      .then((Jobs1) => {
        console.log("Jobs-------5", Jobs1);

        if (Jobs1) {
          res.status(200).json({ message:"job is updated" });
        }
      })
      .catch((error) => {
        console.log("Jobs-------6", error);
        if (error) return res.status(400).json({ error });
      });
  }else{
    res.status(400).json({ error: 'params jobs details is required'});
  }

  // if (jobs) {
  //   const {
  //     openingType,
  //     nameDepartments,
  //     opening,
  //     feeType,
  //     date,
  //     certification,
  //     stipend,
  //     description,
  //     jobType,
  //     experience,
  //     paidAmt
  //   } = jobs;

  //   const newJob = new Jobs({
  //     user: req.user._id,
  //     openingType,
  //     nameDepartments,
  //     opening,
  //     feeType,
  //     date,
  //     certification,
  //     stipend,
  //     description,
  //     jobType,
  //     experience,
  //     paidAmt
  //   });

  //   newJob
  //     .save()
  //     .then((savedJob) => {
  //       if (savedJob) {
  //         res.status(200).json({ savedJob });
  //       }
  //     })
  //     .catch((error) => {
  //       if (error) return res.status(400).json({ error });
  //     });
  // } else {
  //   res.status(400).json({ error: "params education required" });
  // }
};

exports.getJobDetail = (req, res) => {
  if(!Boolean(req?.body?.jobID)){
    return res.status(400).json({ error:"please provide job ID" });
  }
  Jobs.findOne({_id:req.body.jobID})
  .populate("user")
    .then((savedJob) => {
      if (savedJob) {
        res.status(200).json({ savedJob });
      }
    })
    .catch((error) => {
      if (error) return res.status(400).json({ error });
    });
};

exports.getJobsList = (req, res) => {
  Jobs.find()
    .then((savedJob) => {
      if (savedJob) {
        res.status(200).json({ savedJob });
      }
    })
    .catch((error) => {
      if (error) return res.status(400).json({ error });
    });
};
