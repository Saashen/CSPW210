const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const app = express();
const articlesRouter = require('./routes/articles');

const handleError = (err, req, res, next) => {
  res.status(500).send('Error found: ' + err.message);
};

// ** Add to cors later **
// const corsOptions = {
//   origin: 'https://saashen.github.io/CSPW210-frontend/',
//   optionsSuccessStatus: 200,
// };

const startServer = port => {
  app.use(cors('*'));
  app.use(logger('dev'));
  app.use(express.json());
  app.use('/api', articlesRouter);
  app.use(handleError);

  app.listen(port);
  console.log('Listening port', port);
};

module.exports = startServer;
