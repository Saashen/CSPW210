const jwt = require('jsonwebtoken');
require('dotenv').config();

const getIdFromHeader = require('../helpers/getIdFromHeader');
const { users } = require('../db/models');
const { handleValidationError } = require('../helpers/handleError');

const registration = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const user = await users.findByEmail(email);

    if (user) {
      return res.status(409).send({
        message: 'User with such email already exists',
      });
    }

    const newUser = await users.createUser({ name, email, hash: password });

    return res.status(201).send({
      message: 'User successfully created',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return handleValidationError(err, req, res, next);
    }
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await users.findByEmail(email);

    if (!user || !user.validPassword(password)) {
      res.status(401).send({ message: 'Wrong email or password' });
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.SECRET_WORD, {
      expiresIn: '1h',
    });
    await user.update({ token });

    return res.status(200).send({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const user = await users.findUserById(getIdFromHeader(req));
    await user.updateOne({ token: null });
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = { registration, login, logout };
