require('dotenv').config();

const port = process.env.PORT || 3001;
const startServer = require('./server');
const db = require('./db');

db.then(() => startServer(port)).catch(error =>
    console.log(`Server is not running. ${error.message}`),
);
