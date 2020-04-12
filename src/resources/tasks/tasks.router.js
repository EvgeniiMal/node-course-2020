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
    const taskInDB = await tasksService.checkTask({
      id: req.params.id
    });
    if (taskInDB) {
      const task = await tasksService.getTask(req.params.id);
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
    const TaskInDB = await tasksService.checkTask({
      id: req.params.id
    });
    if (TaskInDB) {
      const task = await tasksService.updateTask({
        id: req.params.id,
        title: req.body.title,
        order: req.body.order,
        description: req.body.description,
        userId: req.body.userId,
        boardId: req.params.boardId,
        columnId: req.body.columnId
      });
      res.json(task);
    } else {
      throw new NotFoundError();
    }
  })
);

tasksRouter.route('/:id').delete(
  errorWrapper(async (req, res) => {
    const TaskInDB = await tasksService.checkTask({
      id: req.params.id
    });
    if (TaskInDB) {
      await tasksService.deleteTask(req.params.id);
      res.sendStatus(200);
    } else {
      throw new NotFoundError();
    }
  })
);

module.exports = tasksRouter;
