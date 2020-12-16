const electron = require('electron');
const TimerTray = require('./app/TimerTray');

const { app } = electron;

let tray;

app.on('ready', () => {
  if (process.platform === 'darwin') {
    app.dock.hide();
  }
  
  tray = new TimerTray();
});