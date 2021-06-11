const passport = require('passport');
const getIdFromHeader = require('../helpers/getIdFromHeader');

const isAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(403).send({ message: 'Access is forbidden' });
    }

    next();
  })(req, res, next);
};

module.exports = { isAuth };
