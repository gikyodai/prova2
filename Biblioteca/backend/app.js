var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var livroRoutes = require('../backend/routes/livroRoutes');

var app = express();

// Conexão com o banco de dados
mongoose.connect('mongodb://localhost/Biblioteca', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro na conexão com o banco de dados:'));
db.once('open', () => {
  console.log('Conexão com o banco de dados estabelecida.');
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(livroRoutes);
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
app.listen(3001, () => {
  console.log('Servidor iniciado na porta 3000.');
});
module.exports = app;
