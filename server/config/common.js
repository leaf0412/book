module.exports = {
  sendError: (ctx, err) => {
    ctx.body = {
      code: err.code || -1,
      msg: err.errmsg
    };
  }
};
