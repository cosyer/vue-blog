const express = require("express");
const router = express.Router();
const mysql = require("./mysql");

/* 获取音乐 */
router.get("/getmusic/:id", (req, res) => {
  let id = req.params.id;
  mysql.connect(() => console.log("ok"));
  mysql.query(`SELECT id FROM music`, (err, data) => {
    if (!err) {
      if (id == 0) {
        id = data.length;
      } else if (id > data.length) {
        id = 1;
      }
      mysql.query(`SELECT * FROM music WHERE id = ${id};`, (err, data) => {
        if (!err) {
          return res.send({ err: 0, data: data });
        } else {
          return res.json({ err: -999, message: "切换失败请检查网络重试!" });
        }
      });
    } else {
      return res.json({ err: -999, message: "资源加载失败." });
    }
  });
});
module.exports = router;
