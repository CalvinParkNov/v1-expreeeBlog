const { sql } = require("../dbconfig/config");

//constructor
const Post = function (post) {
  this.title = post.title;
  this.userId = post.userId;
  this.content = post.content;
};

Post.getAll = async (newPost, result) => {
  const sqlQuery = `SELECT
                            *
                      FROM
                            POST`;
  await sql.query(sqlQuery, newPost, (error, res) => {
    if ((error, res)) {
      return result(err, null);
    }
    return result(err, null);
  });
};

module.exports = Post;
