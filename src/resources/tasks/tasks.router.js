const tasksRouter = require('express').Router({ mergeParams: true });
const tasksService = require('./tasks.service');

tasksRouter.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.params.boardId);
  res.json(tasks);
});

tasksRouter.route('/:id').get(async (req, res) => {
  const taskInDB = await tasksService.checkTask({
    id: req.params.id
  });
  if (taskInDB) {
    const task = await tasksService.getTask(req.params.id);
    res.json(task);
  } else {
    res.sendStatus(404);
  }
});

tasksRouter.route('/').post(async (req, res) => {
  const response = await tasksService.addTask({
    title: req.body.title,
    order: req.body.order,
    description: req.body.description,
    userId: req.body.userId,
    boardId: req.params.boardId,
    columnId: req.body.columnId
  });
  res.json(response);
});

tasksRouter.route('/:id').put(async (req, res) => {
  const TaskInDB = await tasksService.checkTask({
    id: req.params.id
  });
  if (TaskInDB) {
    const task = await tasksService.updateTask({
      id: req.params.id,
      title: req.body.title,
      columns: req.body.columns
    });
    res.json(task);
  } else {
    res.sendStatus(400);
  }
});

tasksRouter.route('/:id').delete(async (req, res) => {
  const response = await tasksService.deleteTask(req.params.id);
  res.sendStatus(response);
});

module.exports = tasksRouter;
