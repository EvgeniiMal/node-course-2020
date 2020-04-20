const mongoose = require('mongoose');
const uuid = require('uuid');

const boardSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid
  },
  title: {
    type: String
  },
  columns: {
    type: Array,
    default: []
  }
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
