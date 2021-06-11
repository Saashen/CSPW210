const passport = require('passport');
const getIdFromHeader = require('../helpers/getIdFromHeader');

const isAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    console.log(req.app.locals.user);
    if (!user || err) {
      return res.status(403).send({ message: 'Forbidden' });
    }

    req.app.locals.user = getIdFromHeader(req);
    next();
  })(req, res, next);
};

module.exports = { isAuth };
