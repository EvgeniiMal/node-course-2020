const authRouter = require('express').Router();
const errorWrapper = require('../../utils/errorHandlerWrapper');
const authService = require('./auth.service');

authRouter.route('/').post(
  errorWrapper(async (req, res) => {
    const token = await authService.createToken(
      req.body.login,
      req.body.password
    );
    if (token) {
      res
        .set('Authorization', `Bearer ${token}`)
        .status(200)
        .json({ token });
    } else {
      res.status(403).json('Incorrect login or password');
    }
  })
);

module.exports = { authRouter };
