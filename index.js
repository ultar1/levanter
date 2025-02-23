require('dotenv').config();
const { Client } = require('./lib/client');
const { getVars } = require('./lib/vars');
const logger = require('./logger');

const start = async () => {
  try {
    const session = process.env.SESSION_ID;
    if (!session) {
      throw new Error('SESSION_ID is not defined');
    }

    const client = new Client();
    await client.connect(session);
    logger.info('Client connected');
  } catch (err) {
    logger.error(err.message, { err });
    process.exit(1);
  }
};

start();
