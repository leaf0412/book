module.exports = {
  sendError: (ctx, err) => {
    ctx.body = {
      code: -1,
      err: err.errmsg,
      msg: "操作失败"
    };
  }
};
