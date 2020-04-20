const router = require('express').Router();
const usersService = require('./user.service');
const errorWrapper = require('../../utils/errorHandlerWrapper');
const errors = require('../../utils/errors');

router.route('/').get(
  errorWrapper(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(usersService.toResponse));
  })
);

router.route('/:id').get(
  errorWrapper(async (req, res) => {
    const user = await usersService.getUser(req.params.id);
    if (user) {
      res.json(await usersService.toResponse(user));
    } else {
      throw new errors.NotFoundError();
    }
  })
);

router.route('/').post(
  errorWrapper(async (req, res) => {
    const response = await usersService.addUser({
      name: req.body.name,
      login: req.body.login,
      password: req.body.password
    });
    res.json(await usersService.toResponse(response));
  })
);

router.route('/:id').put(
  errorWrapper(async (req, res) => {
    const user = await usersService.updateUser(req.params.id, {
      name: req.body.name,
      login: req.body.login,
      password: req.body.password
    });
    if (user) {
      res.json(await usersService.toResponse(user));
    } else {
      throw new errors.NotFoundError();
    }
  })
);

router.route('/:id').delete(
  errorWrapper(async (req, res) => {
    const status = await usersService.deleteUser(req.params.id);
    if (status) {
      res.sendStatus(200);
    } else {
      throw new errors.NotFoundError();
    }
  })
);

module.exports = router;
