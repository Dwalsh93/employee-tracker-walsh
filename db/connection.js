const mysql = require('mysql2');
// const Connection = require('mysql2/typings/mysql/lib/Connection');

const connection = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    port: '3306',
    // Your MySQL password
    password: 'password',
    database: 'employeedb'
  });

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;