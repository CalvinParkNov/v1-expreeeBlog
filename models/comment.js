const { sql } = require("../dbconfig/config");

//constructor
const Comments = function (comments) {
  this.post_id = comments.post_id;
  this.user_id = comments.user_id;
  this.comments_content = comments.comments_content;
};

Comments.getAll = async (newComment, result) => {
  const sqlQuery = `SELECT 
                        c.COMMENTS_CONTENT,
                        u.ID,
                        DATE_FORMAT(c.INS_DATE, '%Y-%m_%d') INS_DATE
                    FROM 
                        COMMENTS c, POST p, USER u
                    WHERE 
                        c.POST_ID = p.POST_ID AND 
                        c.USER_ID = u.USER_ID AND
                        p.POST_ID = ${newComment.post_id}`;
  await sql.query(sqlQuery, newComment, (error, res) => {
    if (!res) {
      return result({ message: "댓글이 없습니다" }, null);
    }
    return result(null, res);
  });
};
Comments.insComment = async (newComment, result) => {
  const sqlQuery = `INSERT INTO COMMENTS SET ?`;
  await sql.query(sqlQuery, newComment, (error, res) => {
    if (error) {
      return result(error);
    }
    return result(null, res);
  });
};

module.exports = Comments;
