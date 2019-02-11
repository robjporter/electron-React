'use strict'

const electron = require('electron');
const { app, BrowserWindow, ipcMain, Menu, TouchBar } = electron;
const windowStateKeeper = require('./utils/windowState');
const { red, blue, magenta, yellow, bold } = require('colorette');
const { TouchBarButton, TouchBarLabel, TouchBarSpacer } = TouchBar;
const path = require('path');
const url = require('url');

const functions = require('../common/functions');
const utilities = require('electron-util');
const is = require('../vendor/electron-is');

const { SHOW_WAIT_WINDOW, HIDE_WAIT_WINDOW } = require('../common/constants.js');

const waitWindow_Width = 500;
const waitWindow_Height = 200;

let mainWindow = null;
let splashWindow = null;
let backgroundWindow = null;
let waitWindow = null;
let mainWindowState = {};


const installExtensions = async () => {
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ['REACT_DEVELOPER_TOOLS','REDUX_DEVTOOLS'];

    return Promise
        .all(extensions.map(name => installer.default(installer[name], forceDownload)))
        .catch(console.log);
};

// Check for updates
require("update-electron-app") ({
    repo: "robjporter/electron-sofa",
    updateInterval: "1 hour"
});

// Temporary fix broken high-dpi scale factor on Windows (125% scaling)
// info: https://github.com/electron/electron/issues/9691
if (process.platform === 'win32') {
    app.commandLine.appendSwitch('high-dpi-support', 'true')
    app.commandLine.appendSwitch('force-device-scale-factor', '1')
  }

// Anything that needs configuring if we are running in development mode
if(is.dev()) {
    // FIXME: Ignore 'ERR_CERT_AUTHORITY_INVALID' errors - Mockoon generated
    app.commandLine.appendSwitch('ignore-certificate-errors',true);
}

function makeSingleInstance () {
    console.log('makeSingleInstance');
    if (process.mas) return;
    app.requestSingleInstanceLock();
    try {
        app.on('second-instance', () => {
            if (mainWindow) {
                if (mainWindow.isMinimized()) mainWindow.restore()
                    mainWindow.focus();
            }
        });
    } catch(err){}
}

function createMainWindow() {
    const mainWindowStateKeeper = windowStateKeeper.windowStateKeeper('main');
    const windowOptions = {
        title: 'Main Window',
        x: mainWindowStateKeeper.x,
        y: mainWindowStateKeeper.y,
        width: mainWindowStateKeeper.width,
        height: mainWindowStateKeeper.height,
        show: false,
        transparent: false,
        minHeight: 800,
        minWidth: 1000,
        webPreferences: {
            nodeIntegration: true,
            //preload: __dirname + '/utils/preload.js' // <--- (2) Preload script
            }
    };

    mainWindow = new BrowserWindow(windowOptions);
    mainWindowStateKeeper.track(mainWindow);
    mainWindow.loadURL(
        is.dev()? `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}?home`:`file://${path.join(__dirname, "index.html?home")}`);

    // Open the DevTools
    if(is.dev()) {mainWindow.webContents.openDevTools()}
    mainWindow.on("closed", () => (mainWindow = null));
}

function createSplashWindow() {
    splashWindow = new BrowserWindow({ width: 600, height: 400, frame: false, transparent: false });
    splashWindow.loadURL(
        is.dev()
        ? `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}?splash`
        : `file://${path.join(__dirname, "index.html?splash")}`
    );
    splashWindow.on('ready', () => {splashWindow.show();});
    splashWindow.on("closed", () => (splashWindow = null));
}

function moveWaitWindow() {
    let main = mainWindow.getPosition();
    let main_size = mainWindow.getSize();

    let main_x = main[0];
    let main_y = main[1];
    let main_w = main_size[0];
    let main_h = main_size[1];

    if(main_w > waitWindow_Width && main_h > waitWindow_Height) {
        let add_x = Math.round(((main_w - waitWindow_Width)/2));
        let add_y = Math.round(((main_h - waitWindow_Height)/2));
        waitWindow.setPosition(main_x+add_x,main_y+add_y);
    } else {
        waitWindow.center();
    }
}

function createWaitWindow() {
    waitWindow = new BrowserWindow({width: waitWindow_Width, height: waitWindow_Height, frame: false, show: false, transparent: false, parent: mainWindow ,modal: true, alwayOnTop: true});
    waitWindow.loadURL(is.dev() ? "http://localhost:3000?wait":`file://${path.join(__dirname, "../build/index.html?wait")}`);
}

function createBackgroundWindow() {
    const windowOptions = {show: false,transparent: false};
    backgroundWindow = new BrowserWindow(windowOptions);
}

function showMainWindow() {
    mainWindow.on('ready-to-show', function() {
        setTimeout(function() {splashWindow.hide();mainWindow.show();}, 2000);
    });
}

function startApp() {
    makeSingleInstance();
    console.log("DARKMODE: "+utilities.darkMode.isEnabled);
    console.log("APPLAUNCH: "+utilities.appLaunchTimestamp);
    console.log("ISFIRSTLAUNCH: "+utilities.isFirstAppLaunch());
    console.log("DEBUG: "+utilities.debugInfo());
    console.log("ELECTRON: "+require('../common/functions').isElectron);
    console.log("IS-RENDERER:"+is.renderer());
    console.log("IS-MAIN:"+is.main());
    console.log("IS-MAC:"+is.osx());
    console.log("IS-WINDOWS:"+is.windows());
    console.log("IS-LINUX:"+is.linux());
    console.log("IS-X86:"+is.x86());
    console.log("IS-X64:"+is.x64());
    console.log("IS-PRODUCTION:"+is.production());
    console.log("IS-DEV:"+is.dev());
    console.log("IS-SANDBOX:"+is.sandbox());
    console.log("IS-MACAPPSTORE:"+is.mas());
    console.log("IS-WINDOWSSTORE:"+is.windowsStore());
    console.log("IS-ALL:"+is.all(is.osx, is.x64));
    console.log("IS-NONE:"+is.none(is.osx));
    console.log("IS-ONE:"+is.one(is.osx));
    console.log("IS-RELEASE:"+is.getRelease());
    console.log("IS-RELEASE:"+is.release('10.14.2'));
    console.log("IS-GTRELEASE:"+is.gtRelease('10.14.1'));
    console.log("IS-LTRELEASE:"+is.ltRelease('10.15.0'));
    createSplashWindow();
    createBackgroundWindow();
    createWaitWindow();
    createMainWindow();
    showMainWindow();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
      await installExtensions();
    }
    startApp();
  })
  
  // Quit when all windows are closed.
  app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
      startApp()
    }
  })
  
  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.
  
  require('./utils/ipc_main.js');
  
  ipcMain.on(SHOW_WAIT_WINDOW, (event, arg) => {showWaitWindow(event, arg)});
  ipcMain.on(HIDE_WAIT_WINDOW, (event, arg) => {hideWaitWindow(event, arg)});
  
  function showWaitWindow(event,arg) {
      moveWaitWindow();
      waitWindow.show();
      event.returnValue = "";
  }
  
  function hideWaitWindow(event,arg) {
      waitWindow.hide();
      event.returnValue = "";
  }