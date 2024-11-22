var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var dosensRouter = require('./routes/dosen');
var mahasiswasRouter = require('./routes/mahasiswa');
var staffsRouter = require('./routes/staff');
var skripsisRouter = require('./routes/skripsi');

var app = express();

app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/mahasiswas', mahasiswasRouter);
app.use('/api/dosens', dosensRouter);
app.use('/api/staffs', staffsRouter);
app.use('/api/skripsis', skripsisRouter);
app.use('/api/users', usersRouter);

const run = require('./seeder');

run().then(() => {
    console.log('Create and Seeding Database Complete!');
  }).catch((err) => {
    console.error("Error running the script:", err);
  });
  
console.log('Server Running!');

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// var listener = app.listen(8888, function(){
//   console.log('Listening on port ' + listener.address().port); //Listening on port 8888
// });

module.exports = app;
