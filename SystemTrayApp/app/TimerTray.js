const electron = require('electron');

const { app, Menu, Tray } = electron;

class TimerTray {
  constructor(iconPath, mainWindow) {
    this.tray = new Tray(iconPath)
    this.mainWindow = mainWindow;
    this.windowVisibility = this.mainWindow.isVisible();
    
    this.tray.setToolTip('Timer App');
    this.tray.on('click', this.onClick.bind(this));
    this.tray.on('right-click', this.onRightClick.bind(this));
  }

  setTitle(timeLeft) {
    this.tray.setTitle(timeLeft);
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