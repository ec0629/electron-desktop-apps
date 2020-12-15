const electron = require('electron');
const { Tray } = electron;

class TimerTray {
  constructor(iconPath, mainWindow) {
    this.tray = new Tray(iconPath)
    this.mainWindow = mainWindow;
    this.onClick = this.onClick.bind(this);
    
    this.tray.setToolTip('Timer App');
    this.tray.on('click', this.onClick);
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
}

module.exports = TimerTray;