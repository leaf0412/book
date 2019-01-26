const Router = require("koa-router");
const Dicts = require("../databases/model/dicts");
const { sendError } = require("../config/common");
const router = new Router();

router.prefix("/dict");

router.post("/add", async function(ctx, next) {
  let { remark, name } = ctx.request.body;
  if (name) {
    let data = {
      name: name || "",
      remark: remark || ""
    };
    let { errmsg, successMsg } = await add(data);
    if (errmsg) sendError(ctx, { errmsg });
    else if (successMsg) {
      ctx.body = {
        code: 0,
        msg: "操作成功"
      };
    }
  } else {
    sendError(ctx, { errmsg: "参数不能为空" });
  }
});

router.post("/all", async function(ctx, next) {
  let result = await find();
  ctx.body = {
    code: 0,
    list: result,
    msg: "操作成功"
  };
});

const add = data => {
  return new Promise(resolve => {
    const dict = new Dicts(data);
    Dicts.findOne({ name: data.name }, (err, doc) => {
      if (err) resolve(err);
      if (doc) {
        resolve({ errmsg: "类别名称已经存在" });
      } else {
        dict.save((err, res) => {
          if (err) return err;
          resolve({ successMsg: "操作成功" });
        });
      }
    });
  });
};

const find = data => {
  return new Promise(resolve => {
    Dicts.find({}, { _id: 0 }, (err, res) => {
      if (err) return resolve(err);
      resolve(res);
    });
  });
};

module.exports = router;
