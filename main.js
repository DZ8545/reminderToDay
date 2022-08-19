const { app, BrowserWindow, ipcMain, screen } = require("electron");
const path = require("path");

const createWindow = () => {
  let size = screen.getPrimaryDisplay().workAreaSize;
  const win = new BrowserWindow({
    width: 500,
    height: 500,
    type: "toolbar", //创建的窗口类型为工具栏窗口
    frame: false, //要创建无边框窗口
    resizable: false, //禁止窗口大小缩放
    transparent: true, //设置透明
    alwaysOnTop: true, //窗口是否总是显示在其他窗口之前
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // 通过预加载将 electron 中的一些 node 的API挂载到window对象上
    },
  });
  // win.webContents.openDevTools();

  ipcMain.on("set-position", (event, position) => {
    let x = position[0],
      y = position[1];
    if (x < 0) {
      x = 0;
    } else if (x > size.width - 50) {
      x = size.width - 50;
    }
    if (y < 0) {
      y = 0;
    } else if (y > size.height - 50) {
      y = size.height - 50;
    }
    BrowserWindow.fromWebContents(event.sender).setPosition(x, y);
  });

  win.loadFile("./src/index.html");
};

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
