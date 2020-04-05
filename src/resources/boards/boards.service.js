const boardsRepo = require('./board.memory.repository');

const checkBoard = async obj => await boardsRepo.checkBoard(obj);

const updateBoard = async data => await boardsRepo.updateBoard(data);

const getAll = async () => await boardsRepo.getAll();

const getBoard = async id => await boardsRepo.getBoard(id);

const addBoard = async (title, columns) => {
  const newBoard = await boardsRepo.addBoard(title, columns);
  return newBoard;
};

const deleteBoard = async id => await boardsRepo.deleteBoard(id);

module.exports = {
  getAll,
  addBoard,
  getBoard,
  checkBoard,
  updateBoard,
  deleteBoard
};
