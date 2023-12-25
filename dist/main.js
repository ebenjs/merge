"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const node_path_1 = __importDefault(require("node:path"));
const metadataManager_js_1 = require("./utilities/metadataManager.js");
const createWindow = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const windowPosition = { x: 0, y: 0 };
    const position = (0, metadataManager_js_1.getPosition)();
    if (position) {
        windowPosition.x = position.x;
        windowPosition.y = position.y;
    }
    const mainWindow = new electron_1.BrowserWindow({
        width: (_b = (_a = (0, metadataManager_js_1.getDimensions)()) === null || _a === void 0 ? void 0 : _a.width) !== null && _b !== void 0 ? _b : 300,
        height: (_d = (_c = (0, metadataManager_js_1.getDimensions)()) === null || _c === void 0 ? void 0 : _c.height) !== null && _d !== void 0 ? _d : 200,
        resizable: true,
        frame: false,
        transparent: true,
        webPreferences: {
            preload: node_path_1.default.join(__dirname, "preload.js"),
            nodeIntegration: true,
        },
    });
    mainWindow.loadFile("index.html");
    mainWindow.setPosition(windowPosition.x, windowPosition.y);
    //   mainWindow.webContents.openDevTools();
    mainWindow.on("move", () => {
        const position = mainWindow.getPosition();
        const persistancePosition = {
            x: position[0],
            y: position[1],
        };
        (0, metadataManager_js_1.setPosition)(persistancePosition);
    });
    mainWindow.on("resize", () => {
        const dimensions = mainWindow.getSize();
        const persistanceDimensions = {
            width: dimensions[0],
            height: dimensions[1],
        };
        (0, metadataManager_js_1.setDimensions)(persistanceDimensions);
    });
});
electron_1.app.whenReady().then(() => {
    createWindow();
});
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin")
        electron_1.app.quit();
});
