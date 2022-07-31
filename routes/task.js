const express = require("express");
const router = express.Router();
const task = require("../controllers/task");

router.route("/").get(task.getAllTask);

module.exports = router;
