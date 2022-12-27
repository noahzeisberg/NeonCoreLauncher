const { app, BrowserWindow, ipcMain } = require('electron')
const { spawn } = require('child_process')
const { os } = require('os');

const createWindow = () => {
    const window = new BrowserWindow({
        width: 1200,
        height: 679
        // For a HTML file height of 650 (+29)
    })

    window.loadFile("index.html")
    window.setMenuBarVisibility(false)
    window.setResizable(false)
    window.setIcon("src/favicon.png")

    ipcMain.on('button-clicked', launchGame)
}

app.whenReady().then(() => {
    createWindow()
    openFolder("%userprofile%\\AppData\\Roaming\\.minecraft\\mods")
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit()
})

function openFolder(path) {
    const explorer = spawn('explorer.exe', [path]);
}