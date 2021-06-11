require('dotenv').config();

const db = require('./db');
const startServer = require('./server');
const port = process.env.PORT || 3005;

db.then(() => startServer(port)).catch(error =>
    console.log(`Server is not running. ${error.message}`),
);
