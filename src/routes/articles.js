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
} = require('../validation/articleValidation');
const { isAuth } = require('../validation/tokenValidation');
const { uploadImage } = require('../helpers/images');

router
  .get('/articles', getArticles)
  .get('/articles/:articleId', getArticleById)
  .post('/articles', isAuth, uploadImage, validateCreateArticle, addArticle)
  .patch('/articles/:articleId', isAuth, validateUpdateArticle, updateArticle)
  .delete('/articles/:articleId', isAuth, removeArticle);

module.exports = router;
