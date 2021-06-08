require('dotenv').config();
const mongoose = require('mongoose');
const dbUri = process.env.DB_URI;

const connection = mongoose.connect(dbUri, {
  promiseLibrary: global.Promise,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

mongoose.connection.on('connected', () =>
  console.log('Database connection successful'),
);

mongoose.connection.on('error', err => {
  console.log('Database connection error: ', err.message);
  process.exit(1);
});

mongoose.connection.on('disconnected', () =>
  console.log('Database disconnected'),
);

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection disconnected. App termination');
    process.exit(1);
  });
});

module.exports = connection;
