const electron = require('electron');

const { app, BrowserWindow } = electron;

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
    height: 500,
    width: 300,
    frame: false,
    resizable: false,
  });
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);
});