const express = require("express");
const router = express.Router();
const mysql = require("./mysql");
const jwt = require("./jsonwebtoken");
const format = require("./formatVerify");
/* 获取标签 */
router.get("/getlables", function(req, res) {
  mysql.connect(() => console.log("数据库连接成功"));
  mysql.query("SELECT lable,id FROM article;", (err, data) => {
    if (!err) {
      return res.send({ err: 0, message: data });
    } else {
      return res.json({ err: -999, content: "查询错误!" });
    }
  });
});

/* 获取标签详情页 */
router.post("/getlableInfo", (req, res) => {
  const { lable } = req.body;
  mysql.connect(() => console.log("ok"));
  const sql = `SELECT * FROM article WHERE lable = '${lable}';`;
  mysql.query(sql, (err, data) => {
    if (!err) {
      return res.send({ err: 0, message: data });
    } else {
      return res.json({
        err: -999,
        message: "抱歉网络有点跟不上了，等一会再试试叭!",
      });
    }
  });
});

/* 获取文章分类 */
router.get("/getcategroys", (req, res) => {
  const sql =
    "SELECT article_categroy, COUNT(article_categroy) FROM article GROUP BY article_categroy;";
  mysql.query(sql, (err, value) => {
    if (!err) {
      return res.send({ err: 0, message: value });
    } else {
      return res.json({
        err: -999,
        message: "文章分类查询出错了,你可以将建议反馈给我噢!",
      });
    }
  });
});

/* 获取分类详情页 */
router.post("/getManycategroys", (req, res) => {
  const { categroy } = req.body;
  const sql = "SELECT * FROM article WHERE article_categroy = ?";
  const parmas = [categroy];
  mysql.query(sql, parmas, (err, value) => {
    if (!err) {
      return res.send({ err: 0, message: value });
    } else {
      return res.json({
        err: -999,
        message: "查询出错了,你可以将建议反馈给我噢!",
      });
    }
  });
});

/* 获取详情页数据+文章评论数据 */
router.get("/bynotetext/:id", function(req, res) {
  const path = req.params.id;
  mysql.connect(() => console.log("数据库连接成功"));
  const sqlOne = `SELECT content,article_brief,article_img,time,title,visited FROM article WHERE article_id = '${path}';`;
  const sqlTwo = `SELECT * FROM access_message WHERE article_id = '${path}';`;
  const message = {};
  mysql.query(sqlOne, (err, article_data) => {
    if (!err) {
      /* 将文章数据保存 */
      message.content = article_data;
      /* 更新后台浏览数量数据start */
      const updateAccessUser =
        "UPDATE article SET visited = ? WHERE article_id = ?";
      const parmas = [++article_data[0].visited, path];
      mysql.query(updateAccessUser, parmas); // 直接执行更新操作
      /* 更新浏览数据end */

      mysql.query(sqlTwo, async (err, access_data) => {
        if (!err) {
          /* 如果有评论我们再判断是否有回复 */
          if (access_data.length > 0) {
            await access_data.forEach((item, i) => {
              mysql.query(
                `SELECT * FROM detail_reply WHERE reply_username = '${item.username}' AND reply_date = '${item.date}' AND article_type = '${path}';`,
                (err, value) => {
                  if (!err) {
                    item.replyAccess = value;
                    if (i === access_data.length - 1) {
                      /* 将评论回复数据添加 */
                      message.data = access_data;
                      return res.send({ err: 0, message: message });
                    }
                  }
                }
              );
            });
          } else {
            message.data = [];
            return res.send({ err: 0, message: message });
          }
        } else {
          return res.json({ erroy: -1, content: "评论信息查询错误!" });
        }
      });
    } else {
      return res.json({ erroy: -1, content: "文章查询错误!" });
    }
  });
});

/* 获取最近文章 */
router.get("/gettimenoteList", (req, res) => {
  // select * from 表名 where 列名 between '时间段1' and '时间段2
  const nowdate = new Date();
  let year = nowdate.getFullYear();
  let mouth = nowdate.getMonth() + 1;
  // 以一个月为间隔
  let target = mouth - 1;
  const day = nowdate.getDate();
  mysql.connect(() => console.log("数据库连接成功"));
  mysql.query(
    `SELECT title,lable,article_id,time FROM article WHERE time BETWEEN '${year}-${target}-${day} 11:18:54' AND '${year}-${mouth}-${day} 11:18:54' ORDER BY id DESC;`,
    (err, data) => {
      if (!err) {
        return res.json(data);
      } else {
        return res.json({ erroy: -1, content: "查询错误!" });
      }
    }
  );
});

/* 文章点赞 */
router.post("/notelike", (req, res) => {
  const { likestar, id } = req.body;
  mysql.connect(() => console.log("ok"));
  const sql = `UPDATE article SET like_Star=${likestar} WHERE id=${id};`;
  mysql.query(sql, (err, data) => {
    if (!err) {
      return res.send({ err: 0, message: data });
    } else {
      return res.json({
        err: -999,
        message: "抱歉网络有点跟不上了，等一会再试试叭!",
      });
    }
  });
});

/* 文章评论 */
router.post("/accessPulish", (req, res) => {
  const { token, article_id, access_content } = req.body;
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
      const date = `${year}-${mouth}-${day} ${hours}:${minutes}:${second}`;
      mysql.connect(() => console.log("ok!"));
      /* 声明一个查询sql语句 */
      const sqlSelect = `SELECT name,uploadimg FROM user WHERE username = '${data.token.username}';`;
      mysql.query(sqlSelect, (err, msg) => {
        if (!err) {
          /* 一个插入sql语句 */
          JSON.stringify(msg);
          const sqlINsert = `INSERT INTO access_message(username,name,article_id,Imgsrc,value,date)
             VALUES('${data.token.username}','${msg[0].name}','${article_id}','${msg[0].uploadimg}','${access_content}','${date}');`;
          /* 插入数据库 */
          mysql.query(sqlINsert, (err) => {
            if (!err) {
              res.send({ err: 0, message: "发表成功!" });
              /* 进行评论数量查询 */
              mysql.query(
                `SELECT value FROM access_message WHERE article_id='${article_id}'`,
                (err, data) => {
                  if (!err) {
                    let length = data.length;
                    mysql.query(
                      `UPDATE article SET accessPulish_count = ${length} WHERE article_id = '${article_id}'`
                    );
                  }
                }
              );
            } else {
              return res.json({
                err: -999,
                message: "失败了,检查一下网络设置叭!",
              });
            }
          });
        } else {
          return res.json({ err: -999, message: err.message });
        }
      });
    })
    .catch((err) => {
      return res.json({ err: -999, message: "发布失败,非法的token!" });
    });
});

/* 模糊查询文章 */
router.post("/like_article_search", (req, res) => {
  const { value } = req.body;
  const sql =
    "SELECT * FROM article WHERE LOCATE(?, title) > 0 ORDER BY id DESC;";
  mysql.query(sql, [value], (err, data) => {
    if (!err) {
      return res.send({ err: 0, message: data });
    } else {
      return res.json({
        err: -999,
        message: "查询文章出错了, 请把问题留言给我我好进行处理!",
      });
    }
  });
});

/* 获取案例数据 */
router.get("/getdemolist", (req, res) => {
  let { page } = req.query;
  const Pagesize = 6;
  page = (page - 1) * Pagesize;
  const sqlPageSelect = `SELECT * FROM demos ORDER BY id DESC LIMIT ${page},${Pagesize};`;
  mysql.query(sqlPageSelect, (err, data) => {
    if (!err) {
      return res.send({ err: 0, data: data });
    } else {
      return res.json({ err: -999, data: "错误的请求!" });
    }
  });
});

/*文章回复*/
router.post("/replyInfo", async (req, res) => {
  const { replyInfo } = req.body;
  const replyUser = replyInfo.Info.username;
  const replyDate = replyInfo.Info.date;
  const replyType = replyInfo.Info.article_type;
  const replyName = replyInfo.Info.name;
  const replyContent = replyInfo.replyValue;
  const token = req.body.token;
  /* 时间格式 */
  const nowDate = new Date();
  const year = nowDate.getFullYear();
  const mouth = nowDate.getMonth() + 1;
  const day = nowDate.getDate();
  const hours = format.formatVerify(nowDate.getHours());
  const minutes = format.formatVerify(nowDate.getMinutes());
  const second = format.formatVerify(nowDate.getSeconds());
  const date = `${year}-${mouth}-${day} ${hours}:${minutes}:${second}`;
  jwt
    .verifyToken(token)
    .then((data) => {
      mysql.query(
        `SELECT username,name,uploadimg FROM user WHERE username = '${data.token.username}';`,
        (err, value) => {
          if (!err) {
            value = value[0];
            mysql.query(
              `INSERT INTO detail_reply(reply_username,reply_name,reply_date,content,username,user_imgsrc,name,article_type,datetime)
                     VALUES('${replyUser}','${replyName}','${replyDate}','${replyContent}','${value.username}','${value.uploadimg}','${value.name}','${replyType}','${date}');`,
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
            return res.json({ err: -999, message: "网络不太行稍后再试吧!" });
          }
        }
      );
    })
    .catch((err) => {
      return res.send({ err: -999, message: "无效的token!" });
    });
});

/* 发布文章 */
router.post("/articlePublish", (req, res) => {
  const { title, src, brief, content, categroy, lable, articlePath } = req.body;
  const nowDate = new Date();
  const year = nowDate.getFullYear();
  const mouth = nowDate.getMonth() + 1;
  const day = nowDate.getDate();
  const date = `${year}-${mouth}-${day}`;
  const sql =
    "INSERT INTO article(article_brief, article_img, lable, content, title, time, article_id, article_categroy) VALUES(?, ?, ?, ?, ?, ?, ?, ?);";
  const params = [
    brief,
    src,
    lable,
    content,
    title,
    date,
    articlePath,
    categroy,
  ];
  mysql.query(sql, params, (err) => {
    if (!err) {
      return res.json({ err: 0, message: "发表成功" });
    } else {
      return res.json({
        err: -999,
        message: "出错了，请检查网络设备是否正常!",
      });
    }
  });
});

/* 获取文章基本信息 */
router.get("/getArticleInfo/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM article WHERE article_id = '${id}'`;
  mysql.query(sql, (err, result) => {
    if (!err) {
      return res.send({ err: 0, message: result });
    } else {
      return res.json({ err: -999, message: "文章信息获取失败，请重新尝试!" });
    }
  });
});

/* 修改文章 */
router.post("/editorArticle", (req, res) => {
  const {
    article_brief,
    article_img,
    content,
    title,
    lable,
    article_id,
    article_categroy,
  } = req.body;
  const sql =
    "UPDATE article SET article_brief = ?, article_img = ?, content = ?, lable = ?, title = ?, article_categroy = ? WHERE article_id = ?;";
  const parmas = [
    article_brief,
    article_img,
    content,
    lable,
    title,
    article_categroy,
    article_id,
  ];
  mysql.query(sql, parmas, (err) => {
    if (!err) {
      return res.json({ err: 0, message: "文章信息更新完成!" });
    } else {
      console.log(err.message);
      return res.json({
        err: -999,
        message: "更新失败，请检查网络情况再次尝试吧!",
      });
    }
  });
});
module.exports = router;
