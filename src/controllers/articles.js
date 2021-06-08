require('../db/index');
const Articles = require('../models/schema/article');

const getArticles = async (req, res, next) => {
  try {
    const articles = await Articles.find();
    res.status(200).send(articles);
  } catch (error) {
    next(error);
  }
};

const getArticleById = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const article = await Articles.findById({ _id: articleId });
    article
      ? res.status(200).send(article)
      : res.status(404).send({ message: 'Not found' });
  } catch (error) {
    next(error);
  }
};

const addArticle = async (req, res, next) => {
  try {
    const article = await Articles.create(req.body);
    res.status(201).send(article);
  } catch (error) {
    next(error);
  }
};

const updateArticle = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const article = await Articles.findByIdAndUpdate(
      { _id: articleId },
      { ...req.body },
      { new: true },
    );
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
    const article = await Articles.findByIdAndRemove({ _id: articleId });
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
