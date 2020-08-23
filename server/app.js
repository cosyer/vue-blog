var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var app = express();
var uploadRouter = require("./routes/upload");
var usersRouter = require("./routes/users");
var noteRouter = require("./routes/note");
var messageRouter = require("./routes/leavemessage");
var pageRouter = require("./routes/page");
var musicRouter = require("./routes/music");
const session = require("express-session");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
// session 生成
app.use(
  session({
    secret: "dsakljfldkjflkjgfdjg", //密钥
    cookie: { maxAge: 60 * 1000 * 120 }, //过期时间两小时
    resave: true,
    saveUninitialized: true,
  })
);

app.use(logger("dev"));
/* 开发模式 */
app.use(
  cors({
    origin: ["http://localhost:8080", "http://192.168.51.221:8080"],
    credentials: true,
  })
);
/* 上线模式 */
// app.use(cors({
//   origin:['http://codelei.cn','http://www.codelei.cn'],
//   credentials: true
// }))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* 配置静态资源目录 */
app.use("/", express.static(__dirname + "/public"));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/talkImages", express.static(__dirname + "/talkImages"));
app.use("/images", express.static(__dirname + "/images"));

app.use("/upload", uploadRouter);
app.use("/user", usersRouter);
app.use("/note", noteRouter);
app.use("/message", messageRouter);
app.use("/page", pageRouter);
app.use("/music", musicRouter);

/* 捕捉404 */
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
