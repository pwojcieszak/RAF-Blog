var mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'zaq1@WSX',
    database: 'projektWWW'
})

module.exports = pool;
