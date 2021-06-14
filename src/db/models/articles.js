const Articles = require('../schema/article');

const getAllArticles = ({ page, limit }) => {
  const options = {
    page,
    limit,
    populate: { path: 'author', select: 'name -_id' },
    collation: {
      locale: 'en',
    },
  };

  return Articles.paginate({}, options, (err, result) => (err ? err : result));
};

const getOneArticle = id => Articles.findOne({ _id: id });

const createArticle = (article, id, imageURL) =>
  Articles.create({ ...article, author: id, image: imageURL });

const updateArticleById = (id, article) =>
  Articles.findByIdAndUpdate({ _id: id }, { ...article }, { new: true });

const removeArticleById = id => Articles.findByIdAndRemove({ _id: id });

module.exports = {
  getAllArticles,
  getOneArticle,
  createArticle,
  updateArticleById,
  removeArticleById,
};
