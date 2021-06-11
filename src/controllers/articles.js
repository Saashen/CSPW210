const getIdFromHeader = require('../helpers/getIdFromHeader');

// const { DEFAULT_PAGE, DEFAULT_LIMIT } = require('../helpers/constants');
const {
  getAllArticles,
  getOneArticle,
  createArticle,
  updateArticleById,
  removeArticleById,
} = require('../db/models/articles');

const getArticles = async (req, res, next) => {
  // const { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT } = req.query;

  try {
    // const articles = await getAllArticles({ page, limit });
    const articles = await getAllArticles();
    res.status(200).send(articles);
  } catch (err) {
    next(err);
  }
};

const getArticleById = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const article = await getOneArticle(articleId);
    article
      ? res.status(200).send(article)
      : res.status(404).send({ message: 'Not found' });
  } catch (error) {
    next(error);
  }
};

const addArticle = async (req, res, next) => {
  try {
    const article = await createArticle(req.body, getIdFromHeader(req));
    res.status(201).send(article);
  } catch (error) {
    next(error);
  }
};

const updateArticle = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const article = await updateArticleById(articleId, req.body);
    article
      ? res.status(200).send(article)
      : res.status(404).send({ message: 'Not found' });
  } catch (error) {
    next(error);
  }
};

const removeArticle = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const article = await removeArticleById(articleId);
    article
      ? res.status(200).send({ message: 'Article is deleted' })
      : res.status(404).send({ message: 'Not found' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getArticles,
  getArticleById,
  addArticle,
  updateArticle,
  removeArticle,
};
