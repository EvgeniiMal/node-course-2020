const { PORT } = require('./common/config');
const app = require('./app');
const logger = require('./utils/logger');

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);

process.on('uncaughtException', () => {
  const exit = process.exit;
  exit(1);
});

process.on('unhandledRejection', (reason, origin) => {
  logger.log({
    level: 'promise',
    message: `unhandledRejection: ${reason}, origin: ${JSON.stringify(origin)}}`
  });
});
