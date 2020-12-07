const electron = require('electron');

const { app, BrowserWindow, Menu } = electron;

const isMac = process.platform === 'darwin';
let mainWindow;
let addWindow;

function createAddWindow() {
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: 'Add New Todo',
  });
  addWindow.loadURL(`file://${__dirname}/add.html`);
}

const menuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New Todo',
        click() {
          createAddWindow();
        },
      },
      {
        label: 'Quit',
        accelerator: isMac
          ? 'Command+Q'
          : 'Ctrl+Q',
        click() {
          app.quit();
        },
      },
    ],
  },
];

if (isMac) {
  menuTemplate.unshift({});
}

app.on('ready', () => {
  mainWindow = new BrowserWindow();
  mainWindow.loadURL(`file://${__dirname}/main.html`);
  mainWindow.on('closed', () => app.quit());

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});
