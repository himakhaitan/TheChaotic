const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  socials: {
    instagram: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    github: {
      type: String,
    },
  },
  desc: {
    type: String,
    required: true,
  },
  profilePhoto: {
    data: {
      type: Buffer,
    },
    contentType: {
      type: String,
    },
  },
});

const Author = mongoose.model("author", authSchema);

module.exports = Author;
