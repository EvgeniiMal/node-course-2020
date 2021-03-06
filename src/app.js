const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardsRouter = require('./resources/boards/boards.router');
const taskRouter = require('./resources/tasks/tasks.router');
const { authRouter } = require('./resources/auth/auth.router');
const requestLogger = require('./middleware/requestLogMiddleware');
const errorMiddleware = require('./middleware/errorHandlerMiddleware');
const { authMiddleware } = require('./middleware/authMiddleware');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use(requestLogger);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', authMiddleware, userRouter);
app.use('/boards', authMiddleware, boardsRouter);
boardsRouter.use('/:boardId/tasks', authMiddleware, taskRouter);
app.use('/login', authRouter);
app.use(errorMiddleware);

module.exports = app;
