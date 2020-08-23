async function send(mail, code) {
  // 发送目标 发送的看具体内容
  const nodemailer = require("nodemailer"); //导入模块
  let transporter = nodemailer.createTransport({
    host: "smtp.qq.com", //邮件主机类型可以在lib库中选择
    port: 465, //端口
    secure: true,
    auth: {
      //作者
      user: "535509852@qq.com", // 发送者
      pass: "", // 发送者的邮箱smtp
    },
  });
  // 这里写邮件的详情信息
  let obj = {
    from: '"Fred Foo 👻" <535509852@qq.com>', // 发送者
    to: mail, // 接收者
    subject: "您有一条博客注册验证码",
    text: `您好, 您正在注册我的博客账户,验证码:${code}如不是本人操作请忽略。`, //信息描述
  };
  // 开始发送
  await transporter.sendMail(obj, (err, res) => {
    return new Promise((resolve, reject) => {
      if (!err) {
        resolve("发送成功");
      } else {
        reject("验证码发送失败..");
      }
    });
  });
}
module.exports = send;
