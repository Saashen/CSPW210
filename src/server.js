const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const app = express();
const articlesRouter = require('./routes/articles');
const authRouter = require('./routes/auth');
const { handleError } = require('./helpers/handleError');

// ** Add to cors later **
// const corsOptions = {
//   origin: 'https://saashen.github.io/CSPW210-frontend/',
//   optionsSuccessStatus: 200,
// };

const startServer = port => {
  app.use(cors('*'));
  app.use(logger('dev'));
  app.use(express.json({ limit: '50kb' }));
  require('./config/passport');
  app.use('/auth', authRouter);
  app.use('/api', articlesRouter);
  app.use(handleError);

  app.listen(port);
  console.log('Listening port', port);
};

module.exports = startServer;
