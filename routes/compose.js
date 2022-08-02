const express = require("express");
const router = express.Router();
const task = require("../controllers/task");

router.route("/").get(task.getComposePage).post(task.submitCompose);
module.exports = router;
