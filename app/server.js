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
  res.json({ test: 'Hello node js via docker ', key: [1,2,3], from_db });
});


app.use('/fail', async function(req, res) {
  throw new Error('/fail test');
});



/*app.use((req, res, next) => {
  req.cookies_api = new Cookies_api(req, res);
  next();
});
*/

/*let count = 0;
const two_day = 1000*60*60*48;
app.use(function (req, res, next) {
  if (!req.cookies_api.get('u_id')) {
    req.cookies_api.set('u_id', Date.now() + count, { maxAge: two_day, path: '/' });
    count++;
  }
  next();
});
*/

//app.use('/dist', express.static('../dist/'));

//app.use(router_books);
//app.use(router_reviews_books);

/*app.all('*', async function (req, res) {
  var body = await fs.promise_read_file('../index.html', 'utf-8');
  res
    .status(200)
    .send(body);
});
*/


// ===============================================
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Internal error');
});

app.listen(5000, function () {
  console.log('Example app listening on port 80 to 5000!');
});



