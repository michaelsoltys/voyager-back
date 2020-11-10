'user strict';

const mysql = require('mysql');
const config = require('./config');

//local mysql db connection
let connection = mysql.createConnection(config.db);

connection.connect(function(err) {
    if (err) throw err;
    console.info("Successfully connected to the database!");
});

module.exports = connection;