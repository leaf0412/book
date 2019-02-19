const ip = "127.0.0.1";
const username = "admin";
const password = "123456";

module.exports = {
  databases: `mongodb://${username}:${password}@${ip}:27017/admin`,
  port: 9090,
  ip: "0.0.0.0",
  // 跨域配置
  cors: {
    origin: function(ctx) {
      return "*";
    },
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
    maxAge: 5,
    credentials: true,
    allowMethods: ["GET", "POST"],
    allowHeaders: ["Content-Type", "Authorization", "Accept"]
  },
  // 文件数据上传配置
  koabody: {
    multipart: true,
    formidable: {
      // maxFileSize: 200 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
    }
  },
  // error 配置
  settingError: async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.response.status = err.statusCode || err.status || 500;
      ctx.response.body = {
        message: err.message
      };
      // 手动释放error事件
      ctx.app.emit("error", err, ctx);
    }
  }
};
