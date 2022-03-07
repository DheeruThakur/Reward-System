const File = require("../models/user");
var session = require("express-session");
const crypto = require("crypto");

function randomValueHex(len) {
  return crypto.randomBytes(Math.ceil(len)).toString("hex").slice(0, len);
}

exports.createUser = async (req, res) => {
  try {
    const userName = req.body.userName;
    const userHobies = req.body.userHobies;
    const token = randomValueHex(12);
    req.session.token = token;

    const user = new File({
      userName,
      memberSince: new Date().toISOString().split("T")[0],
      userHobies,
      sessionToken: req.session.token,
    });

    const file = await user.save();
    if (!file) {
      res.send("file not saved");
    }
    res.status(200).json({ message: "user created successfully", user: file });
  } catch (err) {
    res.send(err);
  }
};

exports.fetchAll = async (req, res) => {
  try {
    const data = await File.find();
    if (!data) {
      res.send("No user found");
    }
    res.status(200).json({ message: "Fetched successfully", users: data });
  } catch (err) {
    res.send(err);
  }
};

exports.update = async (req, res) => {
  try {
    const user = await File.findOne({
      _id: req.params.userId,
      sessionToken: req.session.token,
    });
    if (!user) {
      res.send("user not found");
    }
    user.userName = req.body.userName;
    user.userHobies = req.body.userHobies;

    const file = await user.save();
    if (!file) {
      res.send("file not updated");
    }
    res
      .status(200)
      .json({ message: "updated successfully", updatedUser: file });
  } catch (err) {
    res.send(err);
  }
};

exports.delete = async (req, res) => {
  try {
    const user = await File.findOneAndDelete({ _id: req.params.userId });
    if (!user) {
      res.send("user not deleted");
    }
    res
      .status(200)
      .json({ message: "deleted successfully", deletedUser: user });
  } catch (err) {
    res.send(err);
  }
};
