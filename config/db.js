var mysql = require('mysql2');

const db = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'zaq1@WSX',
database: 'projektWWW'
})

module.exports = db;
