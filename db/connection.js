const mysql = require('mysql2');
const Connection = require('mysql2/typings/mysql/lib/Connection');

const db = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: 'root',
  // Your MySQL password
  password: 'password',
  database: 'employeedb'
});

Connection.connect();

module.exports = db;