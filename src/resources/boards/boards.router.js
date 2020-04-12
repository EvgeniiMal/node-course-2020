const boardsRouter = require('express').Router();
const boardsService = require('./boards.service');
const errorWrapper = require('../../utils/errorHandlerWrapper');
const { NotFoundError } = require('../../utils/errors');

boardsRouter.route('/').get(
  errorWrapper(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards);
  })
);

boardsRouter.route('/:id').get(
  errorWrapper(async (req, res) => {
    const boardInDB = await boardsService.checkBoard({
      id: req.params.id
    });
    if (boardInDB) {
      const board = await boardsService.getBoard(req.params.id);
      res.json(board);
    } else {
      throw new NotFoundError();
    }
  })
);

boardsRouter.route('/').post(
  errorWrapper(async (req, res) => {
    const response = await boardsService.addBoard(
      req.body.title,
      req.body.columns
    );
    res.json(response);
  })
);

boardsRouter.route('/:id').put(
  errorWrapper(async (req, res) => {
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
      throw new NotFoundError();
    }
  })
);

boardsRouter.route('/:id').delete(
  errorWrapper(async (req, res) => {
    await boardsService.deleteBoard(req.params.id);
    res.sendStatus(200);
  })
);

module.exports = boardsRouter;
