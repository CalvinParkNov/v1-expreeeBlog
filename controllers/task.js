const Post = require("../models/post");
const jwt = require("jsonwebtoken");

exports.getAllTask = (req, res) => {
  const token = req.cookies.access_token;
  Post.getAll((error, data) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    } else {
      res.render("home", { data, token });
    }
  });
};
exports.getComposePage = (req, res) => {
  console.log(req.headers.authorization);
  res.render("compose");
};
