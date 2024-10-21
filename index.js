const { Client, logger } = require('./lib/client');
const { DATABASE, VERSION } = require('./config');
const { stopInstance } = require('./lib/pm2');
const http = require('http');  // Use native HTTP server for lightweight server

const start = async () => {
  logger.info(`levanter ${VERSION}`);

  // Attempt to authenticate the database
  try {
    await DATABASE.authenticate({ retry: { max: 3 } });
  } catch (error) {
    const databaseUrl = process.env.DATABASE_URL;
    logger.error({ msg: 'Unable to connect to the database', error: error.message, databaseUrl });
    return stopInstance();
  }

  // Start the bot
  try {
    const bot = new Client();
    await bot.connect();
  } catch (error) {
    logger.error(error);
    return stopInstance();
  }

  // Bind to Heroku's port to keep the app alive
  const PORT = process.env.PORT || 3000;  // Default to port 3000 for local dev
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Levanter bot is running!\n');
  });

  server.listen(PORT, () => {
    logger.info(`Server is running and listening on port ${PORT}`);
  });
};

start();
