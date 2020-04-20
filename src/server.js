const { PORT } = require('./common/config');
const app = require('./app');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const { connectToDB } = require('./common/connectDB');

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
  connectToDB();
});

mongoose.connection.on('error', err => {
  logger.error({
    message: `DB error: ${err.stack}`
  });
});

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
