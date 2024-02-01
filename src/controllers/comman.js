const HealthInList = require("../models/HealthInList");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ShortUniqueId = require("short-unique-id");
// const shortid = require('shortid');

exports.IndustryInsert = (req, res) => {
  const { name, type } = req.body;
  const _user = new HealthInList({
    name,
    type,
  });

  _user
    .save()
    .then((data) => {
      if (data) {
        return res.status(200).json({
          message: "Industry name Inserted successful.",
        });
      }
    })
    .catch((error) => {
      if (error) {
        return res.status(400).json({
          message: "something went wrong",
        });
      }
    });
};

exports.GetIndustryList = (req, res) => {
  HealthInList.find()
    .then((data) => {
      if (data) {
        return res.status(200).json(data);
      }
    })
    .catch((error) => {
      if (error) {
        return res.status(400).json({
          message: "something went wrong",
        });
      }
    });
};
