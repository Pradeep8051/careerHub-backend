const AppliedJob = require("../models/AppliedJob");
const Jobs = require("../models/Jobs");
// const Cart = require('../models/cart')

function runUpdate(condition, updateData) {
  return new Promise((resolve, reject) => {
    AppliedJob.findOneAndUpdate(condition, updateData, { upsert: true })
      .then((result) => resolve())
      .catch((err) => reject(err));
  });
}

exports.AppliedJobs = async (req, res) => {
  const appliedJob = await AppliedJob.findOne({ user: req.user._id });
  if (appliedJob) {
    // res.status(201).json({appliedJob:"appliedJob part com"})
    // update appliedJob
    let promiseArray = [];
    let alreadyApplied = false;
    req.body.applied.forEach((applied) => {
      const job = applied.job;
      const item = appliedJob.applied.find((c) => c.job == job);
      let condition, update;
      if (item) {
        // condition = { "user": req.user._id, "applied.job": job };
        // update = {
        //     "$set": {
        //         "applied.$": applied
        //     }
        // };

        alreadyApplied = true;
      } else {
        condition = { user: req.user._id };
        update = {
          $push: {
            applied: applied,
          },
        };
      }
      if (Boolean(condition)) {
        promiseArray.push(runUpdate(condition, update));
      }
    });
    if (alreadyApplied) {
      res.status(200).json({ message: "you have already applied" });
      return;
    } else {
      Promise.all(promiseArray)
        .then((response) => res.status(200).json({ response }))
        .catch((error) => res.status(400).json({ error }));
    }
  } else {
    // create new cart if it's not exist
    const appliedJob = new AppliedJob({
      user: req.user._id,
      applied: [req.body.applied],
    });

    appliedJob
      .save()
      .then((savedJob) => {
        if (savedJob) {
          res.status(200).json({ savedJob });
        }
      })
      .catch((error) => {
        if (error) return res.status(400).json({ error });
      });
  }
};

exports.getAppliedJobs = async (req, res) => {
  try {
    const appliedJob = await AppliedJob.findOne({ user: req.user._id })
      .populate("applied.job")
      .then((cart) => {
        // if (error) return res.status(500).json({ error });
        if (cart) {
          try {
            // let cartItems = {};
            console.log("getAppliedJobs-----",cart)
            let jobsData = cart?.applied.map((item, index) => {
              // console.log("getAppliedJobs-----",index,item)
              return {
                // ...item.job,
                _id: item?.job?._id.toString(),
                openingType: item?.job?.openingType,
                nameDepartments: item?.job?.nameDepartments,
                opening: item?.job?.opening,
                feeType: item?.job?.feeType,
                date: item?.job?.date,
                certification: item?.job?.certification,
                paidAmt: item?.job?.paidAmt,
                stipend: item?.job?.stipend,
                jobType: item?.job?.jobType,
                language: item?.job?.language,
                description: item?.job?.description,
                experience: item?.job?.experience,
                status: item?.status,
              };
            });
            res.status(200).json({ jobs: jobsData });
          } catch (e) {
            res.status(400).json({ message: "that's not okay" });
          }
        }
      })
      .catch((error) => {
        if (error) return res.status(400).json({ error });
      });
  } catch (error) {
    if (error) return res.status(600).json({ error });
  }
};

exports.getCreatedJobs = async (req, res) => {
  try {
    const appliedJob = await Jobs.find({ user: req.user._id })
      .then((jobs) => {
        if (jobs) {
          try {
            res.status(200).json({ jobs: jobs });
          } catch (e) {
            res.status(400).json({ message: "It's not okay" });
          }
        }
      })
      .catch((error) => {
        if (error) return res.status(400).json({ error });
      });
  } catch (error) {
    if (error) return res.status(600).json({ error });
  }
};

exports.getUserListAppliedJob = async (req, res) => {
  try {
    let jobId = req?.body?.jobId;
    if (!Boolean(jobId)) {
      res.status(400).json({ message: "jobID is not available " });
    }
    // "656c438694f33b61d4f818cc"
    const appliedJob = await AppliedJob.find(
      { applied: { $elemMatch: { job: { $eq: jobId } } } },
      { user: 1 }
    )
      .populate("user")
      .lean()
      .then((jobs) => {
        if (jobs) {
          const userList = jobs.map((item) => ({
            ...item.user,
          }));
        //   console.log("getUserListAppliedJob------", userList);
          try {
            res.status(200).json({ userList });
          } catch (e) {
            res.status(400).json({ message: "It's not okay" });
          }
        }
      })
      .catch((error) => {
        if (error) return res.status(400).json({ error });
      });
  } catch (error) {
    if (error) return res.status(600).json({ error });
  }
};

// exports.removeCartItems = (req, res) => {
//     const { productId } = req.body.payload;
//     if (productId) {
//       Cart.update(
//         { user: req.user._id },
//         {
//           $pull: {
//             cartItems: {
//               product: productId,
//             },
//           },
//         }
//       ).exec((error, result) => {
//         if (error) return res.status(400).json({ error });
//         if (result) {
//           res.status(202).json({ result });
//         }
//       });
//     }
//   };
