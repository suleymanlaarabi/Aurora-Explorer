import { BrowserWindow, ipcMain } from "electron";

function ipcHandler(mainWindow: BrowserWindow | null) {
  ipcMain.on("toogle-window", () => {
    // minimize or maximize window
    if (mainWindow) {
      if (mainWindow.isMaximized()) {
        mainWindow.restore();
      } else {
        mainWindow.maximize();
      }
    }
  });

  ipcMain.on("is-window-maximized", (event) => {
    // send isMaximize to renderer
    if (mainWindow) {
      event.returnValue = mainWindow.isMaximized();
    }
  });

  ipcMain.on("minimize-window", () => {
    // minimize window
    if (mainWindow) {
      mainWindow.minimize();
    }
  });

  ipcMain.on("close-window", () => {
    // exit app
    if (mainWindow) {
      mainWindow.close();
    }
  });
}

export default ipcHandler;
