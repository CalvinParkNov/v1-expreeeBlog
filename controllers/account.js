const Account = require("../models/accounts");
const jwt = require("jsonwebtoken");
const config = require("../config/authConfig");

exports.loginPage = (req, res) => {
  res.render("login");
};
exports.login = (req, res) => {
  const { id, password } = req.body;
  if (!id || !password) {
    res.status(400).json({ message: "이메일 또는 비밀번호를 입력해주세요." });
    return;
  }
  const login = new Account({ id, password });
  Account.userLogin(login, (error, data) => {
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const token = jwt.sign({ id: data.ID }, config.secret, {
      expiresIn: "15m",
    });

    res.redirect("/");
  });
};

exports.createAccountPage = (req, res) => {
  res.render("createAccount");
};

exports.createAccount = (req, res) => {
  const { id, password } = req.body;
  if (!id || !password) {
    return res.status(400).json({ msg: "아이디 또는 비밀번호를 입력해주세요" });
  }
  const account = new Account({ id, password });

  Account.create(account, (error, data) => {
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    return res.render("welcome_account", { data });
  });
};
