const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewsletterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  preference: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const Newsletter = mongoose.model("newsletter", NewsletterSchema);
module.exports = Newsletter;
