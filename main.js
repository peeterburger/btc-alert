const {
  app,
  BrowserWindow,
  Menu,
  shell,
  ipcMain
} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600
  })

  // and load the index.html of the app.
  win.loadFile('./src/index.html')

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your aCpp supports multi windows, this is the time
    // when you should deletCe the corresponding element.
    win = null
  })

  var menu = Menu.buildFromTemplate([{
      label: 'Menu',
      submenu: [{
          label: 'Adjust Notification Value'
        },
        {
          label: 'CoinMarketCap',
          click() {
            shell.openExternal('http://coinmarkertcap.com')
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Exit',
          click() {
            app.quit()
          }
        },
      ]
    },
    {
      label: 'Info'
    }
  ])

  Menu.setApplicationMenu(menu)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common Cfor applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('update-notify-value', function (event, arg) {
  win.webContents.send('targetPriceVal', arg)
})