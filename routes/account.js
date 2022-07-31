const express = require("express");
const router = express.Router();
const account = require("../controllers/account");

router.route("/").get(account.createAccountPage).post(account.createAccount);

module.exports = router;
