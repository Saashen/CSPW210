const express = require('express');
const router = express.Router();

const {
  getArticles,
  getArticleById,
  addArticle,
  updateArticle,
  removeArticle,
} = require('../controllers/articles');

const {
  validateCreateArticle,
  validateUpdateArticle,
} = require('../validation/article');

router
  .get('/articles', getArticles)
  .get('/articles/:articleId', getArticleById)
  .post('/articles', validateCreateArticle, addArticle)
  .patch('/articles/:articleId', validateUpdateArticle, updateArticle)
  .delete('/articles/:articleId', removeArticle);

module.exports = router;
