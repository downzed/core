const { app, BrowserWindow } = require('electron');
const path = require('path')
const url = require('url')

app.on('ready', () => {
    const http = require('http');
    http.createServer(function(req, res) {
        console.log(req, res)
        res.end("Hello from server started by Electron app!");
        console.log('Hello from server started by Electron app!')
    }).listen(9000);

    win = new BrowserWindow({ width: 1225, height: 980 });
    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
    win.webContents.openDevTools()

})