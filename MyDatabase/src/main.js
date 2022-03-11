const { app, BrowserWindow } = require('electron')
const { ipcRenderer, ipcMain } = require("electron")
const path = require('path')

const mydb = require('./main/sqlitewrapper.js')

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      //nodeIntegration: true,
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.webContents.openDevTools()

  win.loadFile('src/render/index.html')

  setTimeout(() => {
    win.webContents.send("main-to-render-message", "启动完成了");
  }, 3000)
}

app.whenReady().then(() => {
  console.log("Create window");
  //console.log(ipcRenderer);
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 接收从渲染进程发送到主进程的消息
ipcMain.on("render-to-main-message", (event, message) => {
 
  // 在控制台上打印一下
  console.log(`receive message from render: ${message}`);

  // 回复消息
  event.reply("main-to-render-message", `来自主进程：我收到了你的消息“${message}”`);
})

// 接收同步消息
ipcMain.on("render-to-main-message-sync", (event, message) => {

  // 控制台打印一下知道来了
  console.log(`receive sync message from render: ${message}`);

  // 回复渲染进程的同步消息
  event.returnValue = `来自主进程：我收到了你的消息“${message}”`;
})