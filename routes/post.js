const express = require("express");
const router = express.Router();
const task = require("../controllers/task");

router.route("/").get(task.getComposePage).post(task.submitCompose);
router.route("/:post_id").get(task.getSingleTask);
router.route("/like").post(task.insPostLike);
module.exports = router;
