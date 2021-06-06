const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const router = require('./api/router');

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
  app.use(express.json());
  app.use(morgan('dev'));
  app.use('/api', router);
  app.use(handleError);

  app.listen(port);
  console.log('Listening port', port);
};

module.exports = startServer;
