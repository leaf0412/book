const Router = require('koa-router')
const Books = require('../databases/model/books')
const router = new Router()
const fs = require('fs')
const path = require('path')

router.prefix("/book")

const hotGetType = data => {
  return new Promise((resolve, reject) => {
    const { params, pageSize, skip, sort } = data;
    Books.find(
      params,
      { bookid: 1, title: 1, author: 1, desc: 1, category: 1, pic: 1, _id: 0 },
      { sort, limit: pageSize, skip },
      (err, res) => {
        if (err) return reject(err) && console.log(err);
        setTimeout(()=>{
          resolve(res);
        }, 1000);
      }
    );
  });
};

router.post("/hot", async function (ctx, next) {
  let { type, page = 1, pageSize = 10 } = ctx.request.body;
  page = parseInt(page);
  pageSize = parseInt(pageSize);
  let skip = (page - 1) * pageSize;
  //-1 降序 1 升序
  let sort = { count: -1 };
  let params = {};
  if (type) params.category = type
  let doc = await hotGetType({ params, pageSize, skip, sort });
  if (doc) {
    ctx.body = {
      code: 0,
      msg: "操作成功",
      count: doc.length,
      list: doc
    };
  }
});

router.get("/detail", async (ctx, next) => {
  let { bookid } = ctx.query;
  if (bookid) {
    await Books.findOne(
      { bookid },
      {
        _id: 0,
        sectionList: { $slice: -10 },
        "sectionList._id": 0,
        "sectionList.content": 0
      },
      (err, doc) => {
        if (err) {
          sendError(ctx, err);
        } else {
          ctx.body = {
            code: 0,
            msg: "操作成功",
            list: doc
          };
        }
      }
    );
  } else {
    sendError(ctx, { errmsg: "参数不能为空" });
  }
});

router.get("/allChapter", async ctx => {
  let { bookid } = ctx.query;
  if (bookid) {
    await Books.findOne(
      { bookid },
      { _id: 0, "sectionList.id": 1, "sectionList.title": 1 },
      (err, doc) => {
        if (err) {
          sendError(ctx, err);
        } else {
          doc = doc ? doc.sectionList : doc;
          ctx.body = {
            code: 0,
            msg: "操作成功",
            list: doc
          };
        }
      }
    );
  } else {
    sendError(ctx, { errmsg: "参数不能为空" });
  }
});

router.get("/chapterDetail", async ctx => {
  let { id } = ctx.query;
  if (id) {
    await Books.findOne(
      { "sectionList.id": id },
      { _id: 0, "sectionList.$": 1, count: 1 },
      async (err, doc) => {
        if (err) {
          sendError(ctx, err);
        } else {
          if (doc) {
            ctx.body = {
              code: 0,
              msg: "操作成功",
              list: doc.sectionList[0]
            };
            let count = parseInt(doc.count);
            count++;
            await Books.updateOne(
              { "sectionList.id": id },
              { $set: { count } }
            );
          } else {
            ctx.body = {
              code: 0,
              msg: "查无此章节",
              list: doc
            };
          }
        }
      }
    );
  } else {
    sendError(ctx, { errmsg: "参数不能为空" });
  }
});

const filefilter = (data) => {
  // 创建可读流
  const reader = fs.createReadStream(data.path);
  let filePath = path.join(__dirname, '../public/upload/') + `${Date.now() + data.name}`;
  // 创建可写流
  const upStream = fs.createWriteStream(filePath);
  // 可读流通过管道写入可写流
  reader.pipe(upStream);
}
router.post('/upload', async (ctx, next) => {
  // 上传单个文件
  const file = ctx.request.files.file; // 获取上传文件
  if (!file) return
  if (Array.isArray(file)) {
    for (let data of file) {
      filefilter(data)
    }
  } else {
    filefilter(file)
  }
  return ctx.body = {
    msg: "上传成功！"
  }
})


const sendError = (ctx, err) => {
  ctx.body = {
    code: -1,
    err: err.errmsg,
    msg: "操作失败"
  };
};

module.exports = router;