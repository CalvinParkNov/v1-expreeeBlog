const Post = require("../models/post");
const Like = require("../models/like");
const Comment = require("../models/comment");
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
    return res.redirect("login");
  }
  res.render("compose", { token });
};
exports.submitCompose = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(400).json({ message: "로그인을 해주세요" });
  }
  const { title, content } = req.body;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const post = new Post({ user_id: decoded.id, title, content });

  Post.insPost(post, (error, data) => {
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    res.redirect("/");
  });
};
exports.getSingleTask = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(400).json({ message: "로그인을 해주세요" });
  }
  const { post_id } = req.params;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const like = new Like({ user_id: decoded.id, post_id });

  const post = new Post({ post_id });

  const comment = new Comment({ post_id });

  Post.getPost(post.post_id, (error, data) => {
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    //댓글 가져오기
    Comment.getAll(comment, (error, commentsData) => {
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      //좋아요 가져오기
      Like.getLikes(like, (error, like) => {
        if (error) {
          return res.status(400).json({ error: error.message });
        }

        res.render("viewPost", { data, token, commentsData, like });
      });
    });
  });
};

exports.insPostLike = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(400).status({ message: "로그인을 해주세요" });
  }
  const { post_id } = req.body;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const like = new Like({ user_id: decoded.id, post_id });
  Like.insLike(like, (error, data) => {
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    res.status(200).json({ message: "좋아요!" });
  });
};
