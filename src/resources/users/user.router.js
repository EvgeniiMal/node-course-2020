const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const taskRepo = require('../tasks/task.memory.repository');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getUser(req.params.id);
  if (user) {
    res.json(User.toResponse(user));
  } else {
    res.json({});
  }
});

router.route('/').post(async (req, res) => {
  const response = await usersService.addUser(
    req.body.name,
    req.body.login,
    req.body.password
  );
  res.json(User.toResponse(response));
});

router.route('/:id').put(async (req, res) => {
  const userInDB = await usersService.checkUser({
    id: req.params.id
  });
  if (userInDB) {
    const user = await usersService.updateUser({
      id: req.params.id,
      name: req.body.name,
      login: req.body.login,
      password: req.body.password
    });
    res.json(User.toResponse(user));
  } else {
    res.sendStatus(400);
  }
});

router.route('/:id').delete(async (req, res) => {
  const response = await usersService.deleteUser(req.params.id);
  await taskRepo.nullAllUserTask(req.params.id);
  res.sendStatus(response);
});

module.exports = router;
