const Post = require("../models/post");

exports.getAllTask = (req, res) => {
  Post.getAll((error, data) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    } else {
      res.render("home", { data });
    }
  });
};
