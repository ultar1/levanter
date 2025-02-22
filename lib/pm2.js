const pm2 = require('pm2');
const { exec } = require('child_process');
const { delay } = require('delay');
const logger = require('../logger');

const execProcess = async (cmd, args, message) => {
    await delay(1000);
    logger.info(`PM2 ${cmd} ${args || ''} ${message || ''}`);
    
    pm2.connect((err) => {
        if (err) {
            logger.error(err);
            process.exit(2);
        }

        pm2[cmd](args || process.env.pm_id || 'levanter', (error) => {
            if (error) {
                logger.error(error);
            }
            pm2.disconnect();
        });
    });
};

exports.stop = (args, message) => {
    execProcess('stop', args, message);
};

exports.restart = (args, message) => {
    execProcess('restart', args, message);
};
