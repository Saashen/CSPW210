const express = require('express');
const path = require('path');
const cors = require('cors');
const logger = require('morgan');

const app = express();
const articlesRouter = require('./routes/articles');
const authRouter = require('./routes/auth');
const { handleError } = require('./helpers/handleError');

const startServer = port => {
  app.use(cors());
  app.use(logger('dev'));
  app.use(express.json({ limit: '25kb' }));
  app.use(express.static(path.join(__dirname, '..', 'public')));

  require('./config/passport');
  app.use('/auth', authRouter);
  app.use('/api', articlesRouter);
  app.use(handleError);

  app.listen(port);
  console.log('Listening port', port);
};

module.exports = startServer;
