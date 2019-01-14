#!/usr/bin/env node
import webpack from 'webpack';
import open from 'open';
import config from '../webpack.config.dev';
import initDB from './server/db/init';

const express = require('express');
const path = require('path');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// const indexRouter = require('./server/routes/index');
// const questionsRouter = require('./server/routes/questions');


initDB();

const port = 9999;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publickPath: config.output.publicPath,
}));
app.use(require('webpack-hot-middleware')(compiler));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
// app.use('/questions', questionsRouter);

// catch 404 and forward to error handler
app.use((_req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, _req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = _req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('hehe error');
});

app.listen(port, (err) => {
  if (err) {
    console.error(err); //eslint-disable-line
  } else {
    open(`http://localhost:${port}`);
  }
});

// var server = http.createServer(app);
// server.listen(port);
// server.on('error', onError);

// /**
//  * Event listener for HTTP server "error" event.
//  */

// function onError(error: any) {
//   if (error.syscall !== 'listen') {
//     throw error;
//   }

//   var bind = typeof port === 'string'
//     ? 'Pipe ' + port
//     : 'Port ' + port;

//   // handle specific listen errors with friendly messages
//   switch (error.code) {
//     case 'EACCES':
//       console.error(bind + ' requires elevated privileges');
//       process.exit(1);
//       break;
//     case 'EADDRINUSE':
//       console.error(bind + ' is already in use');
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// }
