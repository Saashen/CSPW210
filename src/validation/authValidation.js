const Joi = require('joi');

const validateRegistrateUser = (req, res, next) => {
  const createUserRules = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const result = createUserRules.validate(req.body)
  if (result.error) {
    return res.status(400).send({
      body: req.body,
      message: `missing required ${result.error.details[0].context.key} field`,
    });
  }

  next();
};

const validateLoginUser = (req, res, next) => {
  const createUserRules = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const result = createUserRules.validate(req.body)
  if (result.error) {
    return res.status(400).send({
      body: req.body,
      message: `missing required ${result.error.details[0].context.key} field`,
    });
  }

  next();
};

module.exports = { validateRegistrateUser, validateLoginUser };
