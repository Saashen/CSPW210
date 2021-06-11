const express = require('express');
const router = express.Router();

const { registration, login, logout } = require('../controllers/auth');
const {
  validateRegistrateUser,
  validateLoginUser,
} = require('../validation/authValidation');
const { isAuth } = require('../validation/tokenValidation');

router
  .post('/register', validateRegistrateUser, registration)
  .post('/login', validateLoginUser, login)
  .post('/logout', isAuth, logout);

module.exports = router;
