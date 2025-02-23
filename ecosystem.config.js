module.exports = {
  apps: [{
    name: 'levanter',
    script: 'index.js',
    max_restarts: 10,
    min_uptime: '5s',
    kill_timeout: 5000,
    wait_ready: true,
    exp_backoff_restart_delay: 100,
    env: {
      NODE_ENV: 'production',
      SESSION_ID: process.env.SESSION_ID || '',
      HEROKU_API_KEY: process.env.HEROKU_API_KEY || '',
      HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || '',
      PREFIX: process.env.PREFIX || '.',
      SUDO: process.env.SUDO || ''
    }
  }]
}
