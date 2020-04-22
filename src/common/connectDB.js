const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('./config');
const { addUser } = require('../resources/users/user.service');

const connectToDB = () => {
  mongoose
    .connect(MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .catch(err => console.log(err));

  const db = mongoose.connection;
  db.once('open', () => {
    console.log('Mongo connection successfully!');
    db.dropCollection('users');
    addAdmin();
  });
};

const addAdmin = async () => {
  await addUser({ name: 'admin', login: 'admin', password: 'admin' });
};

module.exports = { connectToDB };
