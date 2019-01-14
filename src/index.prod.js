#!/usr/bin/env node
import open from 'open';
import path from 'path';
import initDB from './server/db/init';

const express = require('express');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

initDB();

const port = 9999;
const app = express();

app.use(express.static(path.join(__dirname, '../dist')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

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
