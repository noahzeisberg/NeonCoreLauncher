const { app, BrowserWindow, ipcMain, Notification, Tray, Menu, nativeImage, globalShortcut } = require('electron')
const icon = nativeImage.createFromPath("src/favicon.png")
const os = require('os')
const fs = require('fs')
const child_process = require('child_process')

const exitButton = document.getElementById("exitButton")
const modButton = document.getElementById("modButton")
const versionSelector = document.getElementById("versionSelector")
const loaderSection = document.getElementById("loader")
const mainSection = document.getElementById("main")

exitButton.addEventListener("click", exit)

function exit() {
    close()
}

function sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds*1000));
}

function checkAppDataFolder() {
    const userInfo = os.userInfo()
    let appDataDir = userInfo.homedir + "\\AppData\\Roaming\\NeonCore"
    if(!fs.existsSync(appDataDir)) {
        fs.mkdirSync(appDataDir, { recursive: true })
        console.log("AppData folder was created!")
    }
}

function openModsFolder(version) {
    const userInfo = os.userInfo();
    let modDir = userInfo.homedir + "\\AppData\\Roaming\\NeonCore\\mods\\" + version + ""
    if(!fs.existsSync(modDir)) {
        fs.mkdirSync(modDir, { recursive: true })
        console.log("Mods folder was created!")
    }
    child_process.exec("start explorer.exe " + "\"" + modDir + "\"")
}

function showNotification(notificationTitle, notificationBody) {
    const notification = new Notification({ title: notificationTitle, body: notificationBody, icon: icon, silent: false}).show()
}

async function load() {
    loaderSection.style.display = "grid"
    mainSection.style.display = "none"
    await sleep(2)
    loaderSection.style.display = "none"
    mainSection.style.display = "block"
}

load()

modButton.addEventListener("click", () => {
    openModsFolder(versionSelector.value)
})