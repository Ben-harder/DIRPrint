const { app, BrowserWindow, Menu, ipcMain} = require('electron')
const {shell} = require('electron');
const fs = require('fs');

require('electron-reload')(__dirname);

process.env.NODE_ENV = 'production';

let win

function createWindow()
{
    win = new BrowserWindow({ width: 650, height: 500 })
    win.loadFile('index.html')
    win.on('closed', () =>
    {
        win = null
    })
    
    //const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    
    //Menu.setApplicationMenu(mainMenu);
    
    Menu.setApplicationMenu(null);
}

app.on('ready', createWindow)

app.on('window-all-closed', () =>
{
    if (process.platform !== 'darwin')
    {
        app.quit()
    }
})

app.on('activates', () =>
{
    if (win === null)
    {
        createWindow()
    }
})

ipcMain.on('path:submit', function(e, path){
    fs.readdir(path, function(err, files) {
        console.log(files);
        win.webContents.send('path:submit', files);
    });
});

