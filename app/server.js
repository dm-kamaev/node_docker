'use strict';

const util = require('util');
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const mysql = require('/node_docker/app/mysql.js');
const bodyParser = require('body-parser')
require('express-async-await')(app);

//const Cookies_api = require('./Cookies_api.js');
//const router_reviews_books = require('./reviews_books/router_reviews_books.js');
//const router_books = require('./books/router_books.js');

const fs = require('fs');
fs.promise_read_file = util.promisify(fs.readFile);

app.use(cookieParser());
app.use(bodyParser.json());

app.use('/', async function(req, res) {
  console.log('URL => '+req.url);
  try {
    var from_db = await mysql.query('SELECT User FROM mysql.user');
  } catch(err) {
    console.log(err);
  }
  res.json({ test: 'Hello node js via docker ', key: [1,2,3, 5], from_db });
});


app.use('/fail', async function(req, res) {
  throw new Error('/fail test');
});


// ===============================================
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Internal error');
});

app.listen(5000, function () {
  console.log('Example app listening on port 80 to 5000!');
});



