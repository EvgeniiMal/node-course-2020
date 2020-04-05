const Board = require('./board.model');
const taskRepo = require('../tasks/task.memory.repository');

let boards = [];

const checkBoard = async boardObj => {
  if (boards.length === 0) return false;
  const { id } = boardObj;
  if (id) {
    return await boards.some(el => el.id === id);
  }
  return false;
};

const getAll = async () => {
  const allBoards = boards;
  return allBoards;
};

const getBoard = async id => {
  const board = await boards.filter(el => el.id === id);
  return board[0];
};

const addBoard = async (title, columns) => {
  const newBoard = await new Board(title, columns);
  boards.push(newBoard);
  return newBoard;
};

const updateBoard = async data => {
  boards.forEach(el => {
    if (el.id === data.id) {
      if (data.title) {
        el.title = data.title;
      }
      if (data.columns) {
        el.columns = data.columns;
      }
      if (data.password) {
        el.password = data.password;
      }
    }
  });
  return await getBoard(data.id);
};

const deleteBoard = async boardId => {
  if (
    await checkBoard({
      id: boardId
    })
  ) {
    boards = boards.filter(el => el.id !== boardId);
    taskRepo.tasks = taskRepo.tasks.filter(el => el.boardId === boardId);
    return 204;
  }
  return 404;
};

module.exports = {
  getAll,
  addBoard,
  getBoard,
  checkBoard,
  updateBoard,
  deleteBoard
};
