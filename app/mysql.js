'use strict';

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'db',
  user     : 'root',
  // password : 'password',
  // user     : 'root',
  // password : 'test123',
  password : 'test123',
  database : 'mysql'
});

connection.connect();

var db = {};
db.query = function (q) {
  return new Promise((res, rej) => {
    connection.query(q, function (error, results, fields) {
      if (error) {
        return rej(error);
      }
      res(results);
    });
  });
};



module.exports = db;
