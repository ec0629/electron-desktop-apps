const electron = require('electron');
const { app, Menu, Tray } = electron;

class TimerTray {
  constructor(iconPath, mainWindow) {
    this.tray = new Tray(iconPath)
    this.mainWindow = mainWindow;
    
    this.tray.setToolTip('Timer App');
    this.tray.on('click', this.onClick.bind(this));
    this.tray.on('right-click', this.onRightClick.bind(this));
  }

  onClick(event, { x, y }) {
    const { mainWindow } = this;
    const { height, width } = mainWindow.getBounds();
    
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      const yPosition = process.platform === 'darwin'
        ? y
        : y - height;

      mainWindow.setBounds({
        x: Math.floor(x - (width / 2)),
        y: yPosition,
        height,
        width,
      });
      mainWindow.show();
    }
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