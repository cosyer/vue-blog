const express = require("express");
const mysql = require("./mysql");
const router = express.Router();
const jwt = require("./jsonwebtoken");
const format = require("./formatVerify");
/* 留言接口 */
router.post("/leavemessage", (req, res) => {
  const { value, token } = req.body;
  jwt
    .verifyToken(token)
    .then((data) => {
      const nowDate = new Date();
      const year = nowDate.getFullYear();
      const mouth = nowDate.getMonth() + 1;
      const day = nowDate.getDate();
      const hours = format.formatVerify(nowDate.getHours());
      const minutes = format.formatVerify(nowDate.getMinutes());
      const second = format.formatVerify(nowDate.getSeconds());
      let date = `${year}-${mouth}-${day} ${hours}:${minutes}:${second}`;
      /* 声明一个查询sql语句 */
      const sqlSelect = `SELECT name,uploadimg FROM user WHERE username = '${data.token.username}';`;
      mysql.query(sqlSelect, (err, msg) => {
        if (!err) {
          /* 一个插入sql语句 */
          JSON.stringify(msg);
          const sqlINsert = `INSERT INTO leave_message(username,name,Imgsrc,value,date) VALUES('${data.token.username}','${msg[0].name}','${msg[0].uploadimg}','${value}','${date}');`;
          mysql.query(sqlINsert, (err) => {
            if (!err) {
              return res.json({
                err: 0,
                message: "发表成功啦,(●'◡'●)博主来的时候就可以看见你的留言啦!",
              });
            } else {
              console.log(err.message);
              return res.json({
                err: -999,
                message: "失败了,检查一下网络设置叭!",
              });
            }
          });
        } else {
          console.log(err.message);
          return res.json({ err: -999, message: "失败了,检查一下网络设置叭!" });
        }
      });
    })
    .catch((err) => {
      return res.json({ err: -999, message: "发布失败,非法的token!" });
    });
});

/* 评论数量计算接口 */
router.get("/accessPulishCount/:article_id", (req, res) => {
  const article_id = req.params.article_id;
  mysql.query(
    `SELECT COUNT(article_id) FROM access_message WHERE article_id = '${article_id}';`,
    (err, data) => {
      if (!err) {
        return res.send({ err: 0, data: data });
      } else {
        return res.json({ err: -999, data: "获取评论数失败!" });
      }
    }
  );
});

/* 评论回复 */
router.post("/replyInfo", async (req, res) => {
  const { replyInfo } = req.body;
  const replyUser = replyInfo.Info.username;
  const replyDate = replyInfo.Info.date;
  const replyName = replyInfo.Info.name;
  const replyContent = replyInfo.replyValue;
  const token = req.body.token;
  /* 时间start */
  const nowDate = new Date();
  const year = nowDate.getFullYear();
  const mouth = nowDate.getMonth() + 1;
  const day = nowDate.getDate();
  const hours = format.formatVerify(nowDate.getHours());
  const minutes = format.formatVerify(nowDate.getMinutes());
  const second = format.formatVerify(nowDate.getSeconds());
  let date = `${year}-${mouth}-${day} ${hours}:${minutes}:${second}`;
  /* 时间end */

  jwt
    .verifyToken(token)
    .then((data) => {
      mysql.query(
        `SELECT username,name,uploadimg FROM user WHERE username = '${data.token.username}';`,
        (err, value) => {
          if (!err) {
            value = value[0];
            mysql.query(
              `INSERT INTO leaveM_reply(reply_username,reply_name,reply_date,content,username,user_imgsrc,name,datetime)
                     VALUES('${replyUser}','${replyName}','${replyDate}','${replyContent}','${value.username}','${value.uploadimg}','${value.name}','${date}');`,
              (err) => {
                if (!err) {
                  return res.json({ err: 0, message: "回复成功!" });
                } else {
                  return res.json({
                    err: -998,
                    message: "回复失败了，检查检查格式在回复吧！",
                  });
                }
              }
            );
          } else {
            return res.json({ err: -996, message: "网络不太行稍后再试吧!" });
          }
        }
      );
    })
    .catch((err) => {
      return res.json({ err: -999, message: err.message });
    });
});
module.exports = router;
