const Router = require("koa-router");
const Books = require("../databases/model/books");
const { sendError } = require("../config/common");
const router = new Router();
const fs = require("fs");
const path = require("path");
const http = require("http");
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
    const fileNum = 25;
    const contentNum = 800;
    const publicPath = "/public/audio/";
    const folderExists = fs.existsSync(`.${publicPath}`);
    if (!folderExists) {
      sendError(ctx, { errmsg: "文件夹不存在" });
    }
    // 该文件夹下的文件数量到达
    const files = fs.readdirSync(`.${publicPath}`);
    if (files.length >= fileNum) {
      files.forEach(filename => {
        fs.unlinkSync(`.${publicPath}${filename}`);
      });
    }
    // // 判断文件是否存在
    let flag = true;
    files.forEach(filename => {
      if (`.${publicPath}${filename}` === `.${publicPath}${title}.mp3`) {
        let filePath = `${publicPath}${title}.mp3`;
        ctx.body = {
          code: 0,
          msg: "操作成功",
          src: filePath
        };
        flag = false;
      }
    });
    if (flag) {
      let strArr = [];
      let contentLength = content.length;
      let num = contentLength - contentNum;
      let i = 1;
      while (num >= 0) {
        let str =
          i === 1
            ? content.substring(0, contentNum * i)
            : content.substring(contentNum * (i - 1), contentNum * i);
        strArr.push({ title, content: str });
        num = contentLength - contentNum * i;
        i++;
      }
      if (i === 1 && num < 0) {
        strArr.push({ title, content });
      }
      let { filePath, errmsg } = await getAudio(strArr);
      if (filePath) {
        ctx.body = {
          code: 0,
          msg: "操作成功",
          src: filePath
        };
      } else {
        sendError(ctx, { errmsg });
      }
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
    // 调用http模块的request方法请求百度接口
    const publicPath = "/public/audio/";
    let chunks = [];
    for (let i = 0; i < data.length; i++) {
      const postData = querystring.stringify({
        lan: "zh", // zh表示中文
        ie: "UTF-8", // 字符编码
        spd: 4, // 表示朗读的语速，1-9 1 最慢 9 最快
        text: data[i].content // 表示要转换的文字
      });
      const options = {
        methods: "GET",
        hostname: "tts.baidu.com",
        path: "/text2audio?" + postData
      };
      let result = await getBaiduApi(options);
      chunks.push(...result);
    }
    // 这里用到了Buffer模块，大概意思就是把获取到的语音文件流存入到body里面，body是一个Buffer
    const body = Buffer.concat(chunks);
    // 生成的mp3文件存储的路径
    const filePath = path.normalize(`.${publicPath}${data[0].title}.mp3`);
    // fs模块写文件
    fs.writeFileSync(filePath, body);
    resolve({ filePath: `${publicPath}${data[0].title}.mp3` });

  });
};

// http请求文字转换语音的方法
const getBaiduApi = options => {
  return new Promise(resolve => {
    const req = http.request(options, function(res) {
      let chunks = [];
      res.on("data", function(chunk) {
        chunks.push(chunk); // 获取到的音频文件数据暂存到chunks里面
      });
      res.on("end", function() {
        resolve(chunks);
      });
    });
    req.end();
  });
};

module.exports = router;
