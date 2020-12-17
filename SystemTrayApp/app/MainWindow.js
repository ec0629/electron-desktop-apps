const electron = require('electron');
const { BrowserWindow } = electron;

class MainWindow {
  constructor(url) {
    const window = new BrowserWindow({
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

    window.loadURL(url);

    this.window = window;
    this.onBlur = this.onBlur.bind(this);
    this.setWindowPosition = this.setWindowPosition.bind(this);
    this.toggleWindowVisibility = this.toggleWindowVisibility.bind(this);
    this.isVisible = this.isVisible.bind(this);
    
    window.on('blur', this.onBlur);
  }

  isVisible() {
    this.window.isVisible();
  }

  onBlur() {
    setTimeout(() => {
      this.window.hide();
    }, 100);
  }

  setWindowPosition({ x, y }) {
    const { window } = this;
    const { height, width } = window.getBounds();
      const yPosition = process.platform === 'darwin'
        ? y
        : y - height;

      window.setBounds({
        x: Math.floor(x - (width / 2)),
        y: yPosition,
        height,
        width,
      });
  }

  toggleWindowVisibility(bounds) {
    const { window } = this;

    if (window.isVisible()) {
      window.hide();
    } else {
      this.setWindowPosition(bounds);
      window.show();
    }
  }
}

module.exports = MainWindow;
