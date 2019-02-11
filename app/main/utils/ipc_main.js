const electron = require('electron');
const { app, ipcMain } = electron;
const { SHOW_WAIT_WINDOW, HIDE_WAIT_WINDOW, APPLICATION_QUIT, ACI_FETCH_LATEST_FIRMWARE_VERSION, ACI_FETCH_ALL_FIRMWARE_VERSION, ACI_FETCH_PLATFORM_FIRMWARE_VERSION, ACI_QUERY_TENANT_NAME_EXISTS } = require("../../common/constants");

ipcMain.on(APPLICATION_QUIT, (event, arg) => { quit( event, arg )});

function quit(even,arg) {
	app.quit();
}
