const mongoose = require("../index");
const dictSchema = mongoose.Schema({
  name: { type: String },
  remark: { type: String }
});

const dictModel = mongoose.model("dicts", dictSchema);
module.exports = dictModel;
