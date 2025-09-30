const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

// Controller global
const dataController = require(path.join(__dirname, "backend/controllers/dataController"));

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // secure bridge to frontend
      contextIsolation: true
    }
  });

  // Main entry frontend
  win.loadFile(path.join(__dirname, "frontend/index.html"));
}

// When Electron is ready, create a window
app.whenReady().then(createWindow);

// IPC global ufor CRUD
ipcMain.handle("data:get", async () => await dataController.getAllData());
ipcMain.handle("data:add", async (e, item) => await dataController.addData(item));
ipcMain.handle("data:update", async (e, item) => await dataController.updateData(item));
ipcMain.handle("data:delete", async (e, id) => await dataController.deleteData(id));

// To keep a window alive on macOS when all windows are closed
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
