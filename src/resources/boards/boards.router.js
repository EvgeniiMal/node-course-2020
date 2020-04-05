const boardsRouter = require('express').Router();
const boardsService = require('./boards.service');

boardsRouter.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards);
});

boardsRouter.route('/:id').get(async (req, res) => {
  const boardInDB = await boardsService.checkBoard({
    id: req.params.id
  });
  if (boardInDB) {
    const board = await boardsService.getBoard(req.params.id);
    res.json(board);
  } else {
    res.sendStatus(404);
  }
});

boardsRouter.route('/').post(async (req, res) => {
  const response = await boardsService.addBoard(
    req.body.title,
    req.body.columns
  );
  res.json(response);
});

boardsRouter.route('/:id').put(async (req, res) => {
  const boardInDB = await boardsService.checkBoard({
    id: req.params.id
  });
  if (boardInDB) {
    const board = await boardsService.updateBoard({
      id: req.params.id,
      title: req.body.title,
      columns: req.body.columns
    });
    res.json(board);
  } else {
    res.sendStatus(400);
  }
});

boardsRouter.route('/:id').delete(async (req, res) => {
  const response = await boardsService.deleteBoard(req.params.id);
  res.sendStatus(response);
});

module.exports = boardsRouter;
