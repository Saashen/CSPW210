const Users = require('../schema/user');

const findUserById = id => Users.findOne({ _id: id });

const findByEmail = email => Users.findOne({ email });

const createUser = ({ name, email, hash }) => {
  const user = new Users({ name, email, hash });
  return user.save();
};

module.exports = { findUserById, findByEmail, createUser };
