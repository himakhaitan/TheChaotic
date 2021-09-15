const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  author: {
    name: {
      type: String,
      required: true,
    },
  },
  likes: {
    type: Number,
  },
  published: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    required: true,
  },
  tags: [
    {
      tag: {
        type: String,
      },
    },
  ],
});

const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;
