var express = require("express");
var router = express.Router();
var multer = require("multer");
const mysql = require("./mysql");
const fs = require("fs");
const Path = require("path");
const config = require("../config");
const baseURL = config.dev ? "http://localhost:3000" : "";
/* 头像上传. */
var upload = multer({ dest: __dirname + "/../uploads" });
router.post("/headPortraitUpload", upload.single("file"), (req, res) => {
  const file = req.file;
  const newName = file.path + Path.parse(file.originalname).ext;
  // 给文件名添加后缀
  fs.rename(file.path, newName, (err) => {
    if (!err) {
      file.url = `${baseURL}/uploads/${file.filename}${
        Path.parse(file.originalname).ext
      }`;
      return res.send(file);
    } else {
      return res.json({ err: -999, message: "出错了!" });
    }
  });
});
/* 说说的发表 */
const talkImages = multer({ dest: __dirname + "/../talkImages" });
router.post("/sendcontent", talkImages.single("file"), (req, res) => {
  const file = req.file;
  const newName = file.path + Path.parse(file.originalname).ext;
  // 给文件名添加后缀
  fs.rename(file.path, newName, (err) => {
    if (!err) {
      file.url = `${baseURL}/talkImages/${file.filename}${
        Path.parse(file.originalname).ext
      }`;
      return res.send(file);
    } else {
      return res.json({ err: -999, message: "出错了!" });
    }
  });
});
router.post("/talkokSend", (req, res) => {
  const { contents, imgsrc } = req.body;
  const nowDate = new Date();
  const year = nowDate.getFullYear();
  const mouth = nowDate.getMonth() + 1;
  const day = nowDate.getDate();
  const date = `${year}-${mouth}-${day}`;
  const sql = `INSERT INTO talk(content, imgsrc, datetime) VALUES('${contents}', '${imgsrc}', '${date}')`;
  mysql.query(sql, (err) => {
    if (!err) {
      return res.json({ err: 0, data: "发表成功!" });
    } else {
      return res.json({
        err: -999,
        data: "亲爱的站长，出错了请稍后再尝试吧！",
      });
    }
  });
});
router.get("/gettalk", (req, res) => {
  mysql.query("SELECT * FROM talk ORDER BY id DESC", (err, data) => {
    if (!err) {
      return res.send({ err: 0, data: data });
    } else {
      console.log(err);
      return res.json({ err: -999, data: "查询失败!" });
    }
  });
});

/* 笔记图片的上传 */
const imageLoad = multer({ dest: __dirname + "/../images" });
router.post("/imageUpload", imageLoad.single("file"), (req, res) => {
  const file = req.file;
  const newName = file.path + Path.parse(file.originalname).ext; // 获取正确的图片后缀
  fs.rename(file.path, newName, (err) => {
    if (!err) {
      file.url = `${baseURL}/images/${file.filename}${
        Path.parse(file.originalname).ext
      }`;
      return res.send(file);
    } else {
      return res.json({ err: -999, message: "上传过程出错了!" });
    }
  });
});

router.post("/uploadDemo", (req, res) => {
  const { videoPath, videoPIC, content, codePath } = req.body;
  const nowDate = new Date();
  const year = nowDate.getFullYear();
  const mouth = nowDate.getMonth() + 1;
  const day = nowDate.getDate();
  const date = `${year}-${mouth}-${day}`;
  const sql = `INSERT INTO demos(video_path, video_pic, content, code_path, datetime) VALUES('${videoPath}', '${videoPIC}', '${content}', '${codePath}', '${date}')`;
  mysql.query(sql, (err) => {
    if (!err) {
      return res.json({ err: 0, data: "发表成功!" });
    } else {
      return res.json({
        err: -999,
        data: "亲爱的站长，出错了请稍后再尝试吧！",
      });
    }
  });
});
module.exports = router;
