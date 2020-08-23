const mysql = require("./mysql");
function UpdateUser(selectSQL, updateSQL) {
  return new Promise((resolve, reject) => {
    mysql.query(selectSQL, (err, data) => {
      if (!err && data[0] != null) {
        /* 查询到了有这个人的留言下一步进行修改 */
        mysql.query(updateSQL, (err) => {
          if (!err) {
            resolve("修改成功");
          } else {
            reject("修改失败");
          }
        });
      } else {
        resolve("没有相关留言信息");
      }
    });
  });
}
module.exports = {
  UpdateUser,
};
