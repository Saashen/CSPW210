const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Article title is required'],
    },
    text: {
      type: String,
    },
    image: {
      type: String, 
      required: [true, 'Article image is required'],
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
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

ArticleSchema.plugin(mongoosePaginate);
const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
