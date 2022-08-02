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
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(400).json({ message: "로그인을 해주세요" });
  }
  res.render("compose", { token });
};
exports.submitCompose = (req, res) => {
  const token = req.cookies.access_token;
  const { title, content } = req.body;
  if (!token) {
    return res.status(400).json({ message: "로그인을 해주세요" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const post = new Post({ user_id: decoded.id, title, content });

  Post.insPost(post, (error, data) => {
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(200).json({ message: "success" });
  });
};
