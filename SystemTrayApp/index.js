const electron = require('electron');
const path = require('path');
const TimerTray = require('./app/TimerTray');
const MainWindow = require('./app/MainWindow');

const { app } = electron;

let tray;

app.on('ready', () => {
  if (process.platform === 'darwin') {
    app.dock.hide();
  }

  const url = `file://${__dirname}/src/index.html`;
  const mainWindow = new MainWindow(url);

  const iconName = process.platform === 'win32'
      ? 'windows-icon.png'
      : 'iconTemplate.png';
  const iconPath = path.join(__dirname, 'src/assets', iconName);
  
  tray = new TimerTray(iconPath, mainWindow);
});