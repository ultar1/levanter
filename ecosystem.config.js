module.exports = {
  apps: [
    {
      name: 'levanter',
      script: 'npm',
      args: 'start',
      cron_restart: '0 0 * * *', // Example cron pattern to restart the app daily at midnight
      watch: true,
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
