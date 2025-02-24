function startPm2() {
  const pm2 = spawn('yarn', ['pm2', 'start', 'index.js', '--name', 'levanter', '--attach'], {
    cwd: 'levanter',
    stdio: ['pipe', 'pipe', 'pipe'],
  })

  let restartCount = 0
  const maxRestarts = 5 // Adjust this value as needed

  pm2.on('exit', (code) => {
startpm2()
 })
