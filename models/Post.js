const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = Schema({
  user: {
    type: String,
    required: true,
  },
  head: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  comments: {
    type: Array,
    required: true,
  },
  fileId: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model("Post", PostSchema);
