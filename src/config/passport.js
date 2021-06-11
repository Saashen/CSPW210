require('dotenv').config();

const passport = require('passport');
const passportJwt = require('passport-jwt');
const { users } = require('../db/models');
const { Strategy, ExtractJwt } = passportJwt;

const opts = {
  secretOrKey: process.env.SECRET_WORD,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      const user = await users.findUserById(payload.id);
      if (!user) {
        return done(new Error('User is not found'));
      }
      if (!user.token) {
        return done(null, false);
      }
      return done(null, { id: user.id });
    } catch (error) {
      done(error);
    }
  }),
);
