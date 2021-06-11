const jwt = require('jsonwebtoken');
require('dotenv').config();

const getIdFromHeader = req => {
  const [_, token] = req.headers['authorization']
    ? req.headers['authorization'].split(' ')
    : null;
  const { id } = jwt.decode(token, process.env.SECRET_WORD);
  return id;
};

module.exports = getIdFromHeader;
