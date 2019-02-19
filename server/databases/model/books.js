const mongoose = require("../index");
const BooksSchema = mongoose.Schema({
  bookid: { type: Number },
  title: { type: String },
  pic: { type: String },
  author: { type: String },
  isover: { type: String },
  category: { type: String },
  desc: { type: String },
  sectionList: [
    {
      id: { type: String },
      time: { type: Date },
      title: { type: String },
      content: { type: String }
    }
  ],
  count: { type: String }
});

const BooksModel = mongoose.model("books", BooksSchema, "books");
module.exports = BooksModel;
