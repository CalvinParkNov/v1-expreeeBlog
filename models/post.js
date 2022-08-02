const { sql } = require("../dbconfig/config");

//constructor
const Post = function (post) {
  this.post_id = post.post_id;
  this.user_id = post.user_id;
  this.title = post.title;
  this.content = post.content;
};

Post.getAll = async (newPost, result) => {
  const sqlQuery = `SELECT
                            P.TITLE,
                            P.POST_ID,
                            U.ID,
                            P.CONTENT,
                            DATE_FORMAT(P.INS_DATE, '%Y-%m-%d') INS_DATE 
                      FROM
                            POST P, USER U
                      WHERE
                          P.USER_ID = U.USER_ID
                        ORDER BY INS_DATE DESC`;
  await sql.query(sqlQuery, newPost, (error, res) => {
    if (error) {
      return result(error, null);
    }
    return result(null, res);
  });
};
Post.insPost = async (newPost, result) => {
  const sqlQuery = `INSERT INTO POST SET ?`;
  await sql.query(sqlQuery, newPost, (error, res) => {
    if (error) {
      return result(error, null);
    }
    return result(null, { id: res.insertID, ...newPost });
  });
};
Post.getPost = async (newPost, result) => {
  const sqlQuery = `
                    SELECT
                        P.POST_ID,
                        P.TITLE,
                        P.CONTENT,
                        P.USER_ID,
                        U.ID,
                        DATE_FORMAT(P.INS_DATE, '%Y-%m-%d')INS_DATE
                    FROM
                        POST P, USER U
                    WHERE
                        U.USER_ID = P.USER_ID AND
                        P.POST_ID = ${newPost}`;
  await sql.query(sqlQuery, newPost, (error, res) => {
    if (!res.length) {
      return result({ message: "게시글이 없습니다." }, null);
    }
    return result(null, res[0]);
  });
};

module.exports = Post;
