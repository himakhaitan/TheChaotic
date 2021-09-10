const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewsletterSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

const Newsletter = mongoose.model("newsletter", NewsletterSchema);
module.exports = Newsletter;
