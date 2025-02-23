const { spawnSync, spawn } = require('child_process');
const { existsSync, writeFileSync } = require('fs');
const path = require('path');
const config = require('./config.json');
const { Client } = require('./lib/client');
const { getVars } = require('./lib/vars');

const SESSION_ID = process.env.SESSION_ID || config.SESSION_ID;
if (!SESSION_ID) {
  throw new Error('SESSION_ID is not defined');
}

let nodeRestartCount = 0;
const maxNodeRestarts = 5;
const restartWindow = 30000; // 30 seconds
let lastRestartTime = Date.now();

function startPm2() {
  const pm2 = spawn('yarn', ['pm2', 'start', 'index.js', '--name', 'levanter', '--attach'], {
    cwd: 'levanter',
    stdio: ['pipe', 'pipe', 'pipe'],
  });

  let restartCount = 0;
  const maxRestarts = 5; // Adjust this value as needed

  pm2.on('exit', (code) => {
    if (code !== 0) {
      // console.log('yarn pm2 failed to start, falling back to node...')
      startNode();
    }
  });

  pm2.on('error', (error) => {
    console.error(`yarn pm2 error: ${error.message}`);
    startNode();
  });

  // Check for infinite restarts
  if (pm2.stderr) {
    pm2.stderr.on('data', (data) => {
      const output = data.toString();
      if (output.includes('restart')) {
        restartCount++;
        if (restartCount > maxRestarts) {
          // console.log('yarn pm2 is restarting indefinitely, stopping yarn pm2 and starting node...')
          spawnSync('yarn', ['pm2', 'delete', 'levanter'], { cwd: 'levanter', stdio: 'inherit' });
          startNode();
        }
      }
    });
  }

  if (pm2.stdout) {
    pm2.stdout.on('data', (data) => {
      const output = data.toString();
      console.log(output);
      if (output.includes('Connecting')) {
        // console.log('Application is online.')
        restartCount = 0;
      }
    });
  }
}

const startNode = async () => {
  try {
    const client = new Client();
    await client.connect(SESSION_ID);
    logger.info('Client connected');
  } catch (err) {
    logger.error(err.message, { err });
    process.exit(1);
  }
};

startPm2();
