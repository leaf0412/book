const Router = require("koa-router");
const Books = require("../databases/model/books");
const { sendError } = require("../config/common");
const router = new Router();
const fs = require("fs");
const path = require("path");
const http = require("http");
const https = require("https");
const request = require("request");
const querystring = require("querystring");

router.prefix("/book");

/* 热门推荐 */
router.post("/hot", async function(ctx, next) {
  let { type, page = 1, pageSize = 10 } = ctx.request.body;
  page = parseInt(page);
  pageSize = parseInt(pageSize);
  let skip = (page - 1) * pageSize;
  //-1 降序 1 升序
  let sort = { count: -1 };
  let params = {};
  if (type) params.category = type;
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

/* 单个书籍详情 */
router.get("/detail", async (ctx, next) => {
  let { bookid } = ctx.query;
  if (bookid) {
    let res = await Books.findOne(
      { bookid },
      {
        _id: 0,
        __v: 0,
        sectionList: { $slice: 10 },
        "sectionList._id": 0,
        "sectionList.content": 0
      }
    );
    if (res) {
      ctx.body = {
        code: 0,
        msg: "操作成功",
        list: res
      };
    } else {
      sendError(ctx, { errmsg: "暂无数据" });
    }
  } else {
    sendError(ctx, { errmsg: "参数不能为空" });
  }
});

/* 全部章节 */
router.get("/allChapter", async ctx => {
  let { bookid, page = 0, pageSize = 10 } = ctx.query;
  let skip = parseInt(page) * parseInt(pageSize);
  let limit = parseInt(pageSize);
  if (bookid) {
    let res = await Books.findOne(
      { bookid },
      {
        _id: 0,
        sectionList: { $slice: [skip, limit] },
        "sectionList.id": 1,
        "sectionList.title": 1
      }
    );
    if (res) {
      ctx.body = {
        code: 0,
        msg: "操作成功",
        list: res.sectionList
      };
    } else {
      sendError(ctx, { errmsg: "暂无数据" });
    }
  } else {
    sendError(ctx, { errmsg: "参数不能为空" });
  }
});

/* 每一章节的详情 */
router.get("/chapterDetail", async ctx => {
  let { id } = ctx.query;
  if (id) {
    let res = await Books.findOne(
      { "sectionList.id": id },
      { _id: 0, bookid: 1, "sectionList.$": 1, count: 1 }
    );
    if (res) {
      ctx.body = {
        code: 0,
        msg: "操作成功",
        bookid: res.bookid,
        list: res.sectionList[0]
      };
      let count = parseInt(res.count);
      count++;
      await Books.updateOne({ "sectionList.id": id }, { $set: { count } });
    } else {
      sendError(ctx, { errmsg: "查无此章节" });
    }
  } else {
    sendError(ctx, { errmsg: "参数不能为空" });
  }
});

/* 暂时没有用上传，只是预留 */
router.post("/upload", async (ctx, next) => {
  // 上传单个文件
  const file = ctx.request.files.file; // 获取上传文件
  if (!file) {
    sendError(ctx, { errmsg: "参数不能为空" });
  }
  if (Array.isArray(file)) {
    for (let data of file) {
      filefilter(data);
    }
  } else {
    filefilter(file);
  }
  ctx.body = {
    code: 0,
    msg: "上传成功！"
  };
});

/* 每一章节的内容进行语音播放 */
router.post("/play", async ctx => {
  let { title, content } = ctx.request.body;
  if (content && title) {
    content = content.replace(/\s+/g, "");
    content = content.replace(/@+/g, "");
    title = title.replace(/\s+/g, "");
    title = title.replace(/-/g, "");
    let { filePath, errmsg } = await getAudio({ title, content });
    if (filePath) {
      ctx.body = {
        code: 0,
        msg: "操作成功",
        src: filePath
      };
    } else {
      sendError(ctx, { errmsg });
    }
  } else {
    sendError(ctx, { errmsg: "参数不能为空" });
  }
});

const hotGetType = data => {
  return new Promise((resolve, reject) => {
    const { params, pageSize, skip, sort } = data;
    Books.find(
      params,
      { bookid: 1, title: 1, author: 1, desc: 1, category: 1, pic: 1, _id: 0 },
      { sort, limit: pageSize, skip },
      (err, res) => {
        if (err) return reject(err) && console.log(err);
        setTimeout(() => {
          resolve(res);
        }, 1000);
      }
    );
  });
};

const filefilter = data => {
  // 创建可读流
  const reader = fs.createReadStream(data.path);
  let filePath =
    path.join(__dirname, "../public/upload/") + `${Date.now() + data.name}`;
  // 创建可写流
  const upStream = fs.createWriteStream(filePath);
  // 可读流通过管道写入可写流
  reader.pipe(upStream);
};

const getAudio = data => {
  return new Promise(async resolve => {
    // https请求百度接口
    let { title, content } = data;
    const postData = querystring.stringify({
      title,
      content,
      sex: 4,
      speed: 5,
      volumn: 7,
      pit: 5,
      method: "TRADIONAL"
    });
    let options = {
      host: "developer.baidu.com",
      path: "/vcast/getVcastInfo",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Content-Length": postData.length,
        Accept: "application/json, text/javascript, */*; q=0.01",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9",
        Cookie:
          "BAIDUID=EF33ADC820760FB80C16594E23630A5F:FG=1; PSTM=1526457682; BIDUPSID=EF33ADC820760FB80C16594E23630A5F; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; H_PS_PSSID=1464_21112_26350_28415; BDSFRCVID=QRFOJeCwM6144fJ9J3ZQhbw7k0ctwijTH6aokTGiQ8qMtGMZooAtEG0PDU8g0Ku-S2EqogKK3gOTH4PF_2uxOjjg8UtVJeC6EG0P3J; H_BDCLCKID_SF=tRAOoC8atDvHjjrP-trf5DCShUFsQljlB2Q-5-3zJDDMMbQ_efC5Wl_J-ltfa5O2bTv0BfbdJJjojUbjMqLWKfu3QPcz2-RCbgTxoUJgQCnJhhvGqq-KQJ_ebPRiJ-b9Qg-JbpQ7tt5W8ncFbT7l5hKpbt-q0x-jLn7ZVJO-KKChMCIm3J; BDUSS=UREbHNCNWFRYldUMmNVTk1XMmRBMTl3WDZTeEZNNTIyYXRPanZwVjJKUGxIcHhjQUFBQUFBJCQAAAAAAAAAAAEAAAA-5F9JzuG2wM7esK4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOWRdFzlkXRcb; PSINO=6; delPer=0; Hm_lvt_3abe3fb0969d25e335f1fe7559defcc6=1551073007,1551162624; Hm_lpvt_3abe3fb0969d25e335f1fe7559defcc6=1551163877"
      }
    };
    const req = https.request(options, res => {
      let src = "";
      res.setEncoding("utf8");
      res.on("data", chunk => {
        // console.log("chunk", chunk)
        src = JSON.parse(chunk).bosUrl;
      });
      res.on("end", () => {
        resolve({ filePath: src });
      });
    });
    req.on("error", e => {
      console.log(`problem with request: ${e.message}`);
    });
    // write data to request body
    req.write(postData);
    req.end();
  });
};

module.exports = router;
