/* eslint-disable*/
console.log('This script populates some test data to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
  console.error('ERROR: You need to specify a valid mongodb URL as the first argument');
}
const Promise = require('bluebird');
const mongoose = require('mongoose');
const async = require('async');
const User = require('../src/server/db/models/user');
const Question = require('../src/server/db/models/question');

const mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const users = [];

function userCreate(name, cb) {
  const user = new User.default({ name });

  user.save((err) => {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New user: ' + user);
    users.push(user)
    cb(null, user)
  });
}

function questionCreate(title, detail, user, tags, cb) {
  const question = new Question.default({
 title, detail, user, tags
});

  question.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New question: ' + question);
    cb(null, question);
  });
}

function createUserInstances(cb) {
  async.parallel([
    function (callback) {
      userCreate('Zhang San', callback);
    },
    function (callback) {
      userCreate('Li Si', callback);
    },
    function (callback) {
      userCreate('Wang Er', callback);
    },
  ], cb);
}

function createQuestionInstances(cb) {
  async.parallel([
    function (callback) {
      questionCreate('How to exit the Vim editor?', 'I cannot exit from my vim editor.', users[0], ['vim', 'text editor'], callback);
    },
    function (callback) {
      questionCreate('What is the most popular server framework?', undefined, users[1], ['server', 'framework'], callback);
    },
    function (callback) {
      questionCreate('How to exit the Vim editor?', undefined, users[2], [], callback);
    },
    function (callback) {
      questionCreate('How to fish?', undefined, users[0], [], callback);
    },
    function (callback) {
      questionCreate('How to append one file to another in Ubuntu Linux?', undefined, users[1], [], callback);
    },
    function (callback) {
      questionCreate('How to get version of static framework from info.plist? or any other way?', undefined, users[2], [], callback);
    },
  ], cb);
}


async.series([
  createUserInstances,
  createQuestionInstances,
],
// Optional callback
(err, results) => {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('BOOKInstances: '+users);

    }
    // All done, disconnect from database
    db.close();
});
