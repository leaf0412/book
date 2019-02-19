const Koa = require("koa");
const app = new Koa();
const path = require("path");
// 静态资源
const static = require("koa-static");
// post数据和文件上传
const koaBody = require("koa-body");
// 跨域
const cors = require("koa2-cors");

// base config
const config = require("./config/index");

// static
const public = static(path.join(__dirname) + "/public");

// router
const router = require("./rouetr/index");

app.use(config.settingError);

app.on("error", err => {
  console.log(new Date() + " : " + err);
});

app.use(public);

app.use(cors(config.cors));

// 配置文件上传和post请求接受数据
app.use(koaBody(config.koabody));
// 路由
app.use(router());

app.listen(config.port, () => {
  console.log(`server running in http://${config.ip}:${config.port}`);
});
