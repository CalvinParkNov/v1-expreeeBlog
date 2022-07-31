const sql = require("../dbconfig/config");
//constructor
const Account = function (account) {
  this.id = account.id;
  this.password = account.id;
};

Account.create = async (newAccount, result) => {
  const sqlQuery = `INSERT INTO USER SET ?`;
};

module.exports = Account;
