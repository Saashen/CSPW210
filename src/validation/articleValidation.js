const Joi = require('joi');

const validateCreateArticle = (req, res, next) => {
  const createArticleRules = Joi.object({
    title: Joi.string().required(),
    text: Joi.string(),
    image: Joi.string(),
  });

  const result = createArticleRules.validate(req.body);
  result.error && console.log('validation error: ', result.error);
  return result.error
    ? res.status(400).send({
        body: req.body,
        message: result.error.message,
      })
    : next();
};

const validateUpdateArticle = (req, res, next) =>
  req.body && (req.body.title || req.body.body || req.body.image)
    ? next()
    : res.status(400).send({ message: 'Enter something to change' });

module.exports = { validateCreateArticle, validateUpdateArticle };
