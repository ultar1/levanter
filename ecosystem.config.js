module.exports = {
  apps: [{
    name: 'levanter',
    script: 'npm',
    args: 'start',
    max_restarts: 10,
    min_uptime: '5s',
    kill_timeout: 5000,
    wait_ready: true,
    exp_backoff_restart_delay: 100,
    env: {
      NODE_ENV: 'production'
    }
  }]
}
