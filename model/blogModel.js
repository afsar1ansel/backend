const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    des: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;
