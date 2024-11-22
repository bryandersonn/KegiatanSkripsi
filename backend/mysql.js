var mysql = require('mysql2');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root', 
  password: '', 
  database: 'kegiatanskripsi',  
  port: 3306, 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = connection.promise();
