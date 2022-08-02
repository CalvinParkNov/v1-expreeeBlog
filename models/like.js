const { sql } = require("../dbconfig/config");
//constructor
const Like = function (like) {
  this.user_id = like.user_id;
  this.post_id = like.post_id;
};

Like.insLike = async (newLike, result) => {
  const sqlQuery = `INSERT INTO POST_LIKE SET ?`;
  await sql.query(sqlQuery, newLike, (error, res) => {
    if (error) {
      return result(error, null);
    }
    return result(null, res);
  });
};
Like.getLikes = async (newLike, result) => {
  const sqlQuery = `SELECT
                            USER_ID,
                            POST_ID
                      FROM
                            POST_LIKE
                      WHERE
                            USER_ID = ${newLike.user_id} AND
                            POST_ID = ${newLike.post_id}`;
  await sql.query(sqlQuery, newLike, (error, res) => {
    if (error) {
      return result({ message: "데이터 처리 오류" }, null);
    }
    return result(null, res);
  });
};

module.exports = Like;
