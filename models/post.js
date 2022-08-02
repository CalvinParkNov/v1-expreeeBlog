const { sql } = require("../dbconfig/config");

//constructor
const Post = function (post) {
  this.user_id = post.user_id;
  this.title = post.title;
  this.content = post.content;
};

Post.getAll = async (newPost, result) => {
  const sqlQuery = `SELECT
                            P.TITLE,
                            U.ID,
                            P.CONTENT,
                            DATE_FORMAT(P.INS_DATE, '%Y-%m-%d') INS_DATE 
                      FROM
                            POST p, USER u
                      WHERE
                          P.USER_ID = U.USER_ID
                        ORDER BY INS_DATE DESC`;
  await sql.query(sqlQuery, newPost, (error, res) => {
    if (error) {
      return result(err, null);
    }
    console.log(res);
    return result(nll, res);
  });
};
Post.insPost = async (newPost, result) => {
  const sqlQuery = `INSERT INTO POST SET ?`;
  await sql.query(sqlQuery, newPost, (error, res) => {
    if (error) {
      console.log(error);
    }
    return result(null, { id: res.insertID, ...newPost });
  });
};

module.exports = Post;
