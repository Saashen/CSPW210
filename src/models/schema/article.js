const mongoose = require('mongoose');
// const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
    author: {
      type: String,
    },
    date: {
      type: Date,
      default: () => Date.now(),
      required: true,
    },
    comments: [{ body: String, date: Date }],
    meta: {
      favs: Number,
    },
  },
  { versionKey: false, timestamps: true },
);

// ArticleSchema.plugin(mongoosePaginate);
const articleModel = mongoose.model('Article', ArticleSchema);

module.exports = articleModel;
