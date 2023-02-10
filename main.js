const { app, BrowserWindow, ipcMain, Notification, Tray, Menu, nativeImage, globalShortcut } = require('electron')

const createMainWindow = () => {
    const window = new BrowserWindow({
        width: 1200,
        height: 650,
        fullscreenable: false,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    window.loadFile("index.html")
    window.setMenuBarVisibility(false)
    window.setResizable(false)
    window.setIcon("src/favicon.png")
    window.setMovable(false)
}

app.whenReady().then(() => {
    createMainWindow()
    app.setAppUserModelId("NeonCore Launcher");
    globalShortcut.register("Ctrl+Space", () => {
        console.log("Test")
    })
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit()
})