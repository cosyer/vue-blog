const JWT = require("jsonwebtoken");
const secret = "kljskajdoewiioertiojreoitjoidjfgifdjg"; //设置一个私钥（随便输入详情使用看我的博客文章我有写，虽然写的不是很好，凑合看 /狗头）
function createToken(Payload) {
  return JWT.sign(Payload, secret, { expiresIn: 43200 }); //生成token
}
function verifyToken(token) {
  return new Promise((resolve, reject) => {
    JWT.verify(token, secret, (err, data) => {
      if (err) reject({ err: -999, data: "无效的token" });
      else resolve({ err: 0, token: data });
    });
  });
}
module.exports = {
  createToken,
  verifyToken,
};
