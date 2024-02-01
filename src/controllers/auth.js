const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ShortUniqueId = require("short-unique-id");
const Employer = require("../models/Employer");
// const shortid = require('shortid');

exports.signup = (req, res) => {
  const uid = new ShortUniqueId();
  User.findOne({
    $or: [{ email: req.body.email }, { mobile: req.body.mobile }]
  }).then(async (data) => {
    console.log("tesat------", data);
    if (data) {
      return res.status(400).json({
        message: "User is already registered",
      });
    }

    const {
      name,
      fathername,
      age,
      gender,
      role,
      email,
      mobile,
      address,
      password,
      location,
      city,
      district,
      state,
      pincode,
      profileimg
    } = req.body;
    const hash_password = await bcrypt.hash(String(mobile), 10);
    const _user = new User({
      name,
      fathername,
      age,
      gender,
      role,
      email,
      address,
      location,
      city,
      district,
      state,
      pincode,
      hash_password,
      mobile,
      username: uid.stamp(32),
      profileimg
    });

    _user
      .save()
      .then((data) => {
        if (data) {
            const token = jwt.sign(
                { _id: data._id, type: data.type },
                process.env.JWT_SECRET,
                { expiresIn: "30d" }
              );
              console.log("data-----rw--",data)
          return res.status(200).json({
            ...data?._doc,
            message: "Registration  is successful.",token:token

          });
        }
      })
      .catch((error) => {
        if (error) {
          return res.status(400).json(error);
        }
      });
  });
};

exports.employerSignUp = (req, res) => {
  const uid = new ShortUniqueId();
  Employer.findOne({
    $or: [{ email: req.body.email }, { mobile: req.body.mobile }]
  }).then(async (data) => {
    console.log("tesat------", data);
    if (data) {
      return res.status(400).json({
        message: "User is already registered",
      });
    }

    const {
      industryType,
      name,
      contactPerson,
      type,
      responsibilities,
      email,
      mobile,
      organization,
      password,
      country,
      location,
      city,
      benefits,
      webLink,
      profileimg
    } = req.body;
    console.log("mobile----",mobile)
    const hash_password = await bcrypt.hash(String(mobile), 10);
    const _Employer = new Employer({
      industryType,
      name,
      contactPerson,
      type,
      responsibilities,
      email,
      mobile,
      organization,
      password,
      country,
      location,
      city,
      benefits,
      hash_password,
      webLink,
      username: uid.stamp(32),
      profileimg
    });

    _Employer
      .save()
      .then((data) => {
        if (data) {
            const token = jwt.sign(
                { _id: data._id, type: data.type },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
              );
              console.log("data-----rw--",data._doc)
          return res.status(200).json({
            ...data?._doc,
            token:token,
            message: "Registration  is successful.",
          });
        }
      })
      .catch((error) => {
        if (error) {
          return res.status(400).json({
            message: error
          });
        }
      });
  });
};


exports.signin = (req, res) => {
  let {role}=req.body;
  if(role=="employee"){
    User.findOne({ mobile: req.body.phone }).then(async (user) => {

      if (user) {
        if (user.authenticate(req.body.password)) {
          try {
            const admin = await bcrypt.compare(
              req.body.password,
              user.hash_password
            );
            if (admin) {
              const token = jwt.sign(
                { _id: user._id, tye: user.type },
                process.env.JWT_SECRET,
                { expiresIn: "30d" }
              );
              // res.cookie("token", token);
              // const { firstname, lastname, role, email, fullname } = user;
  
              // storing token in client browser
              res.status(200).json({
                token,
                user: user
              });
            } else {
              res.status(400).json({
                message: "invalid password",
              });
            }
          } catch (e) {
            res.status(400).json({
              message: "server error",
            });
          }
        } else {
          return res.status(400).json({
            message: "invalid user",
          });
        }
      }else {
        return res.status(400).json({
          message: "invalid user",
        });
      }
    }).catch((error) => {
      if (error) {
        return res.status(400).json({
          message: error
        });
      }
    });
  }else{
    Employer.findOne({ mobile: req.body.phone }).then(async (user) => {
      if (user) {
        if (user.authenticate(req.body.password)) {
          try {
            const admin = await bcrypt.compare(
              req.body.password,
              user.hash_password
            );
            if (admin) {
              const token = jwt.sign(
                { _id: user._id, type: user.type },
                process.env.JWT_SECRET,
                { expiresIn: "30d" }
              );
              // res.cookie("token", token);
  
              // storing token in client browser
              res.status(200).json({
                token,
                user: user
              });
            } else {
              res.status(400).json({
                message: "invalid password",
              });
            }
          } catch (e) {
            res.status(400).json({
              message: "server error",
            });
          }
        } else {
          return res.status(400).json({
            message: "invalid user1",
          });
        }
      }else{
        return res.status(400).json({
          message: "invalid user2",
        });
      }
    }).catch((error) => {
      if (error) {
        return res.status(400).json({
          message: error
        });
      }
    });
  }

};

exports.ChangePassword = (req, res) => {
  let {role}=req.body;
  if(role=="employee"){
    User.findOne({ mobile: req.body.phone }).then(async (user) => {

      if (user) {

        let pswMatch=await user.authenticate(req.body.oldPassword)
        console.log("notEmpty----2",user,pswMatch)
        if (pswMatch) {
          try {

            const hash_password = await bcrypt.hash(req.body.newPassword, 10);
              user.hash_password = hash_password;
              console.log("hash_password--", hash_password);
              // const { firstname, lastname, role, email, fullname } = user;
              await user.save();

              const token = jwt.sign(
                { _id: user._id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "30d" }
              );

              // storing token in client browser
              res.status(200).json({
                token,
                user: user
              });

          } catch (e) {
            console.log(e)
            res.status(400).json({
              message: "server error",
            });
          }
        } else {
          return res.status(400).json({
            message: "invalid password",
          });
        }
      }
    }).catch((error) => {
      if (error) {
        return res.status(400).json({
          message: error
        });
      }
    });
  }else{
    Employer.findOne({ mobile: req.body.mobile }).then(async (error, user) => {
      if (user) {

        let pswMatch=await user.authenticate(req.body.oldPassword)
        console.log("notEmpty----2",user,pswMatch)
        if (pswMatch) {
          try {

            const hash_password = await bcrypt.hash(req.body.newPassword, 10);
              user.hash_password = hash_password;
              console.log("hash_password--", hash_password);
              // const { firstname, lastname, role, email, fullname } = user;
              await user.save();

              const token = jwt.sign(
                { _id: user._id, type: user.type },
                process.env.JWT_SECRET,
                { expiresIn: "30d" }
              );

              // storing token in client browser
              res.status(200).json({
                token,
                user: user
              });

          } catch (e) {
            console.log(e)
            res.status(400).json({
              message: "server error",
            });
          }
        } else {
          return res.status(400).json({
            message: "invalid password",
          });
        }
      }
    }).catch((error) => {
      if (error) {
        return res.status(400).json({
          message: error
        });
      }
    });
  }

};

// exports.signin = (req, res) => {

//     User.findOne({email: req.body.email})
//     .exec((error, user) => {
//         if(error) return res.status(400).json({ error })
//         if(user){

//             if(user.authenticate(req.body.password)){
//                 const token = jwt.sign({_id: user._id, role: user.role } , process.env.JWT_SECRET , { expiresIn: '1d'});
//                 const {firstname, lastname, role ,email ,fullname} =user;

//                 // storing token in client browser
//                 res.cookie("jwt",token,{
//                     // expires: new Date(Date.now() + 3600000*24*24),
//                     httpOnly: true
//                 });
//                 ////

//                 res.status(200).json({
//                     token,
//                     user: {
//                         firstname, lastname, role ,email ,fullname
//                     }
//                 });
//             }else{
//                 return res.status(400).json({
//                     message: "invalid user"
//                 })
//             }
//         }else{

//         }
//     })
// }
