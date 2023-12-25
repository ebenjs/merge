import { app, BrowserWindow } from "electron";
import path from "node:path";
import {
  getPosition,
  setPosition,
  getDimensions,
  setDimensions,
} from "./utilities/metadataManager.js";
import { IWindowDimensions, IWindowPosition } from "./index.js";

const createWindow = async () => {
  const windowPosition = { x: 0, y: 0 };
  const position = getPosition();

  if (position) {
    windowPosition.x = position.x;
    windowPosition.y = position.y;
  }

  const mainWindow = new BrowserWindow({
    width: getDimensions()?.width ?? 300,
    height: getDimensions()?.height ?? 200,
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
    const persistancePosition: IWindowPosition = {
      x: position[0],
      y: position[1],
    };
    setPosition(persistancePosition);
  });

  mainWindow.on("resize", () => {
    const dimensions = mainWindow.getSize();
    const persistanceDimensions: IWindowDimensions = {
      width: dimensions[0],
      height: dimensions[1],
    };
    setDimensions(persistanceDimensions);
  });
};

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
