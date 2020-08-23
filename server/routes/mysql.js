const mysql = require("mysql");
const connection = mysql.createConnection({
  port: 3306,
  host: "localhost",
  user: "test",
  password: "test",
  database: "blog",
});

/* 简单粗暴的方法，防止mysql长时间未连接中断连接池 */
var count = 0;
setInterval(() => {
  count += 1;
  connection.connect(() => {
    console.log("链接了" + count + "次");
  });
  connection.query("SELECT id FROM article;");
}, 3600000);
module.exports = connection;
