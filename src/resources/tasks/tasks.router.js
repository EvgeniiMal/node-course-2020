const tasksRouter = require('express').Router({ mergeParams: true });
const tasksService = require('./tasks.service');
const errorWrapper = require('../../utils/errorHandlerWrapper');
const { NotFoundError } = require('../../utils/errors');

tasksRouter.route('/').get(
  errorWrapper(async (req, res) => {
    const tasks = await tasksService.getAll(req.params.boardId);
    res.json(tasks);
  })
);

tasksRouter.route('/:id').get(
  errorWrapper(async (req, res) => {
    const task = await tasksService.getTask(req.params.id);
    if (task) {
      res.json(task);
    } else {
      throw new NotFoundError();
    }
  })
);

tasksRouter.route('/').post(
  errorWrapper(async (req, res) => {
    const response = await tasksService.addTask({
      title: req.body.title,
      order: req.body.order,
      description: req.body.description,
      userId: req.body.userId,
      boardId: req.params.boardId,
      columnId: req.body.columnId
    });
    res.json(response);
  })
);

tasksRouter.route('/:id').put(
  errorWrapper(async (req, res) => {
    const task = await tasksService.updateTask(req.params.id, req.body);
    if (task) {
      res.json(task);
    } else {
      throw new NotFoundError();
    }
  })
);

tasksRouter.route('/:id').delete(
  errorWrapper(async (req, res) => {
    const deleted = await tasksService.deleteTask(req.params.id);
    if (deleted) {
      res.sendStatus(200);
    } else {
      throw new NotFoundError();
    }
  })
);

module.exports = tasksRouter;
