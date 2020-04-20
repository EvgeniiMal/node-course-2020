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
    const board = await boardsService.getBoard(req.params.id);
    if (board) {
      res.json(await boardsService.toResponse(board));
    } else {
      throw new NotFoundError();
    }
  })
);

boardsRouter.route('/').post(
  errorWrapper(async (req, res) => {
    const response = await boardsService.addBoard({
      title: req.body.title,
      columns: req.body.columns
    });
    res.json(await boardsService.toResponse(response));
  })
);

boardsRouter.route('/:id').put(
  errorWrapper(async (req, res) => {
    const board = await boardsService.updateBoard(req.params.id, {
      title: req.body.title,
      columns: req.body.columns
    });
    res.json(board);
  })
);

boardsRouter.route('/:id').delete(
  errorWrapper(async (req, res) => {
    const status = await boardsService.deleteBoard(req.params.id);
    if (status) {
      res.sendStatus(200);
    } else {
      throw new NotFoundError();
    }
  })
);

module.exports = boardsRouter;
