const { spawnSync, spawn } = require('child_process')
const { existsSync, writeFileSync } = require('fs')
const path = require('path')

const SESSION_ID = 'updateThis' // Edit this line only, don't remove ' <- this symbol

let nodeRestartCount = 0
const maxNodeRestarts = 5
const restartWindow = 30000 // 30 seconds
let lastRestartTime = Date.now()

function startNode() {
  const child = spawn('node', ['index.js'], { cwd: 'levanter', stdio: 'inherit' })

  child.on('exit', (code) => {
    if (code !== 0) {
      const currentTime = Date.now()
      if (currentTime - lastRestartTime > restartWindow) {
        nodeRestartCount = 0
      }
      lastRestartTime = currentTime
      nodeRestartCount++

      if (nodeRestartCount > maxNodeRestarts) {
        console.error('Node.js process is restarting continuously. Stopping retries...')
        return
      }
      console.log(
        `Node.js process exited with code ${code}. Restarting... (Attempt ${nodeRestartCount})`
      )
      startNode()
    }
  })
}
