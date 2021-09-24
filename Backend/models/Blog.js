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
    data: {
      type: Buffer,
    },
    contentType: {
      type: String,
    },
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "author",
    required: true
  },
  likes: {
    type: Number,
  },
  published: {
    type: Date,
    default: Date.now(),
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
  comments: [
    {
      author: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Blog = mongoose.model("blog", BlogSchema);
module.exports = Blog;
