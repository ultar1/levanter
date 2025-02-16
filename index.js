const { Client, logger } = require('./lib/client');
const { DATABASE, VERSION } = require('./config');
const { stopInstance } = require('./lib/pm2');

const start = async () => {
  logger.info(`levanter ${VERSION}`);
  try {
    await DATABASE.authenticate({ retry: { max: 3 } });
    logger.info('Database connection established successfully.');
  } catch (error) {
    const databaseUrl = process.env.DATABASE_URL;
    logger.error({ msg: 'Unable to connect to the database', error: error.message, databaseUrl });
    return stopInstance();
  }
  try {
    const bot = new Client();
    await bot.connect();
    logger.info('Bot connected successfully.');
  } catch (error) {
    logger.error({ msg: 'Error connecting bot', error: error.message });
    return stopInstance();
  }
};

start().catch(error => {
  logger.error({ msg: 'Unexpected error in start function', error: error.message });
  stopInstance();
});
