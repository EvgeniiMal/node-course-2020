const Board = require('./board.schema');
const { deleteBoardTasks } = require('../tasks/tasks.service');

const addBoard = async newObj => {
  const board = await Board.create(newObj);
  return board;
};
const getAll = async () => {
  const boards = await Board.find({}).exec();
  return await boards.map(toResponse);
};

const updateBoard = async (id, obj) => {
  return Board.updateOne({ _id: id }, obj);
};

const getBoard = async id => {
  const board = await Board.findById(id);
  return board;
};
const deleteBoard = async id => {
  const q = await Board.findByIdAndRemove(id);
  await deleteBoardTasks(id);
  return q;
};

const toResponse = obj => {
  const { id, title, columns } = obj;
  return {
    id,
    title,
    columns
  };
};

module.exports = {
  getAll,
  addBoard,
  getBoard,
  updateBoard,
  deleteBoard,
  toResponse
};
