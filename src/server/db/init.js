import mongoose from 'mongoose';
import Promise from 'bluebird';

export default function initDB() {
  const mongoDB = 'mongodb://yaoyao:Yy654321@ds054289.mlab.com:54289/stack_overflow';
  mongoose.connect(mongoDB, {
    useNewUrlParser: true,
  });

  mongoose.Promise = Promise;

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error')); //eslint-disable-line
}
