const { Client, logger } = require('./lib/client');
const { DATABASE, VERSION } = require('./config');
const { stopInstance } = require('./lib/pm2');
const express = require('express');  // Import express
const app = express();

const start = async () => {
  logger.info(`levanter ${VERSION}`);

  try {
    await DATABASE.authenticate({ retry: { max: 3 } });
  } catch (error) {
    const databaseUrl = process.env.DATABASE_URL;
    logger.error({ msg: 'Unable to connect to the database', error: error.message, databaseUrl });
    return stopInstance();
  }

  try {
    const bot = new Client();
    await bot.connect();
  } catch (error) {
    logger.error(error);
  }

  // Bind the app to the Heroku-assigned port
  const PORT = process.env.PORT || 3000;
  app.get('/', (req, res) => {
    res.send('Levanter bot is running!');
  });
  
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
};

start();
