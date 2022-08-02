const Account = require("../models/accounts");
const jwt = require("jsonwebtoken");

exports.loginPage = (req, res) => {
  const token = req.cookies.access_token;
  res.render("login", { token });
};
exports.login = (req, res) => {
  const { id, password } = req.body;
  if (!id || !password) {
    res.status(400).json({ message: "이메일 또는 비밀번호를 입력해주세요." });
    return;
  }
  const login = new Account({ id, password });
  try {
    Account.userLogin(login, (error, data) => {
      if (error) {
        return res.status(400).json({ message: error.message });
      }
      console.log(data.USER_ID, data.ID);
      const token = jwt.sign(
        { id: data.USER_ID, username: data.ID },
        process.env.JWT_SECRET,
        {
          expiresIn: "15m",
        }
      );
      res.cookie("access_token", token, {
        httpOnly: true,
      });

      return res.redirect("/");
    });
  } catch (error) {
    console.log(error);
  }
};

exports.createAccountPage = (req, res) => {
  const token = req.cookies.access_token;
  res.render("createAccount", { token });
};

exports.createAccount = (req, res) => {
  const token = req.cookies.access_token;
  const { id, password } = req.body;
  if (!id || !password) {
    return res.status(400).json({ msg: "아이디 또는 비밀번호를 입력해주세요" });
  }
  const account = new Account({ id, password });

  Account.create(account, (error, data) => {
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    return res.render("welcome_account", { data, token });
  });
};
