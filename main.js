const { app, BrowserWindow } = require("electron");

let appWin;

const createWindow = ()=>{
    appWin = new BrowserWindow({
        width: 1200,
        height: 900,
        title: "ESCALA",
        resizable: false,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        }
    });
    
    appWin.loadURL(`file://${__dirname}/dist/index.html`);

    appWin.setMenu(null);

    appWin.webContents.openDevTools();

    appWin.on("closed", () => {
        appWin = null;
    });
}

//----------------------------------------- EVENTOS ------------------------------------------------//

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
});