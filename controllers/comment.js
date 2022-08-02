const Comment = require("../models/comment");
const jwt = require("jsonwebtoken");

exports.insComment = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(400).json({ message: "로그인을 해주세요." });
  }
  const { comment, post_id } = req.body;
  if (!comment) {
    return res.status(400).json({ message: "댓글을 작성해주세요." });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const insComment = new Comment({
    post_id,
    user_id: decoded.id,
    comments_content: comment,
  });

  Comment.insComment(insComment, (error, data) => {
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    res.status(200).json({ message: "등록되었습니다." });
  });
};
