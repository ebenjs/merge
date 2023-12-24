const { app, BrowserWindow, screen } = require("electron");
const path = require("node:path");
const { getPosition, setPosition } = require("./utilities/window-position.js");

const windowSize = {
  width: 300,
  height: 200,
};

const createWindow = async () => {
  const windowPosition = { x: 0, y: 0 };
  const rawPosition = await getPosition();

  if (rawPosition !== "") {
    const position = rawPosition.split(",").map((value) => parseInt(value));
    windowPosition.x = position[0];
    windowPosition.y = position[1];
  }

  const mainWindow = new BrowserWindow({
    width: windowSize.width,
    height: windowSize.height,
    resizable: true,
    frame: false,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile("index.html");
  mainWindow.setPosition(windowPosition.x, windowPosition.y);
  //   mainWindow.webContents.openDevTools();
  mainWindow.on("move", () => {
    const position = mainWindow.getPosition();
    setPosition(position);
  });
};

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
