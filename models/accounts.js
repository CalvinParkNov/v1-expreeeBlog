const { sql } = require("../dbconfig/config");
//constructor
const Account = function (account) {
  this.id = account.id;
  this.password = account.password;
};

Account.create = async (newAccount, result) => {
  const sqlQuery = `INSERT INTO USER SET ?`;
  await sql.query(sqlQuery, newAccount, (error, res) => {
    if (error) {
      return result(error, null);
    }
    return result(null, { id: res.insertID, ...newAccount });
  });
};

Account.userLogin = async (userId, result) => {
  let userData = "";
  //sql injection escape
  const exc_userId = sql.escape(userId.id);
  const sqlQuery = `SELECT
                            ID,
                            PASSWORD
                      FROM
                            USER
                      WHERE
                            ID = ${exc_userId}`;
  const data = await sql.query(sqlQuery, (error, res) => {
    if (error) {
      return result(error, null);
    }
    if (!res.length) {
      return result({ message: "비밀번호 또는 아이디를 확인해주세요." }, null);
    } else if (userId.password !== res[0].PASSWORD || !res.length) {
      return result({ message: "비밀번호 또는 아이디를 확인해주세요." }, null);
    }
    return result(null, res[0]);
  });
};

module.exports = Account;
