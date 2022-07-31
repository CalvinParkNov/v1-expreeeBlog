const Signup = require("../models/accounts");

exports.createAccountPage = (req, res) => {
  res.render("createAccount");
};
exports.createAccount = (req, res) => {
  const { id, password } = req.body;
  if (!id || !password) {
    return res.status(400).json({ msg: "아이디 또는 비밀번호를 입력해주세요" });
  }
};
