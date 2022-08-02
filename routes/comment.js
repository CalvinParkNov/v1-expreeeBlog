const express = require("express");
const router = express.Router();
const comment = require("../controllers/comment");

router.route("/").post(comment.insComment);
module.exports = router;
