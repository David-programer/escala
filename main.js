"use strict";

const _electron = require("electron");
const { app, BrowserWindow } = require("electron");
const args = process.argv.slice(1), serve = args.some(val => val === '--serve');

let appWin;

const createWindow = ()=>{
    const {width, height} = _electron.screen.getPrimaryDisplay().workAreaSize;

    appWin = new BrowserWindow({
        width,
        height,
        title: "ESCALA",
        resizable: false,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        }
    });

    if(serve){
        require('electron-reloader')(module);
        appWin.loadURL('http://localhost:4200');
        appWin.webContents.openDevTools();
    }else{
        appWin.loadURL(`file://${__dirname}/dist/index.html`);
    }
    
    appWin.setMenu(null);

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