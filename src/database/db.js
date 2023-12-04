const mysql = require('promise-mysql');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'rollerdreams',
  port: '3306',
  connectionLimit: 10,
});

const getConnection = async () => await connection;

module.exports = {
  getConnection
}