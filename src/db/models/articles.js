const Articles = require('../schema/article');

const getAllArticles = () =>
  Articles.find().populate({
    path: 'author',
    select: 'name email -_id',
  });

// const getAllArticles = ({ page, limit }) => {
//   const options = {
//     page,
//     limit,
//     collation: {
//       locale: 'en',
//     },
//   };

//   return Articles.paginate({}, options, (err, result) =>
//     err ? err : result.docs,
//   );
// };

const getOneArticle = id => Articles.findOne({ _id: id });

const createArticle = (article, id) =>
  Articles.create({ ...article, author: id });

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
