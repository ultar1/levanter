const { spawnSync, spawn } = require('child_process');
const { existsSync, writeFileSync } = require('fs');
const path = require('path');
const { Client, logger } = require('./lib/client')
const { DATABASE, VERSION } = require('./config')

const SESSION_ID = 'levanter_24b2cf2a83f6df4f07a1a579db54d32a94'; // Edit this line only, don't remove ' <- this symbol

let nodeRestartCount = 0;
const maxNodeRestarts = 5;
const restartWindow = 30000; // 30 seconds
let lastRestartTime = Date.now();

const stopInstance = () => {
  process.exit(1);
};

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
};

start();
