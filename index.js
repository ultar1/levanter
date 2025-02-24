const { spawn } = require('child_process');

function startPm2() {
  const pm2 = spawn('npm', ['pm2', 'start', 'index.js', '--name', 'levanter', '--attach'], {
    cwd: 'levanter',
    stdio: ['pipe', 'pipe', 'pipe'],
  });

  let restartCount = 0;
  const maxRestarts = 5; // Adjust this value as needed

  pm2.on('exit', (code) => {
    if (restartCount < maxRestarts) {
      console.log(`Process exited with code ${code}. Restarting...`);
      restartCount++;
      setTimeout(startPm2, 1000); // Adding a delay of 1 second before restarting
    } else {
      console.log('Max restarts reached. Exiting...');
    }
  });
}

startPm2();
