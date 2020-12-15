const electron = require('electron');
const path = require('path');
const TimerTray = require('./app/TimerTray');

const { app, BrowserWindow } = electron;

let mainWindow;
let tray;

app.on('ready', () => {
  if (process.platform === 'darwin') {
    app.dock.hide();
  }
  
  mainWindow = new BrowserWindow({
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
    height: 500,
    width: 300,
    frame: false,
    resizable: false,
    show: false,
  });
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);
  mainWindow.on('blur', () => {
    mainWindow.hide();
  });

  const iconName = process.platform === 'win32'
    ? 'windows-icon.png'
    : 'iconTemplate.png';
  const iconPath = path.join(__dirname, 'src/assets', iconName);
  
  tray = new TimerTray(iconPath, mainWindow);
});