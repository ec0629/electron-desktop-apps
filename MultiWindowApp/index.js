const electron = require('electron');

const {
  app, BrowserWindow, Menu, ipcMain,
} = electron;

const isMac = process.platform === 'darwin';
let mainWindow;
let addWindow;

function createAddWindow() {
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: 'Add New Todo',
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
  });
  addWindow.loadURL(`file://${__dirname}/add.html`);
  addWindow.on('closed', () => {
    addWindow = null;
  });
}

ipcMain.on('todo:add', (event, todo) => {
  mainWindow.webContents.send('todo:add', todo);
  addWindow.close();
});

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

if (process.env.NODE_ENV !== 'production') {
  menuTemplate.push({
    label: 'View',
    submenu: [
      {
        label: 'Toggle Developer Tools',
        accelerator: isMac
          ? 'Command+Alt+I'
          : 'Ctrl+Shift+I',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
    ],
  });
}

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
  });
  mainWindow.loadURL(`file://${__dirname}/main.html`);
  mainWindow.on('closed', () => app.quit());

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});
