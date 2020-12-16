const electron = require('electron');
const path = require('path');
const MainWindow = require('./MainWindow');

const { app, Menu, Tray } = electron;

class TimerTray {
  constructor() {
    const iconName = process.platform === 'win32'
      ? 'windows-icon.png'
      : 'iconTemplate.png';
    const iconPath = path.join(__dirname, '../src/assets', iconName);
    this.tray = new Tray(iconPath)
    this.mainWindow = new MainWindow();
    this.windowVisibility = this.mainWindow.isVisible();
    
    this.tray.setToolTip('Timer App');
    this.tray.on('click', this.onClick.bind(this));
    this.tray.on('right-click', this.onRightClick.bind(this));
  }

  onClick(event, bounds) {
    this.mainWindow.toggleWindowVisibility(bounds);
  }

  onRightClick() {
    const menuConfig = Menu.buildFromTemplate([
      {
        label: 'Quit',
        click: () => app.quit()
      }
    ]);

    this.tray.popUpContextMenu(menuConfig);
  }
}

module.exports = TimerTray;