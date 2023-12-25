"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDimensions = exports.getDimensions = exports.getPosition = exports.setPosition = exports.getMetadata = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const getMetadata = () => {
    try {
        const file = (0, fs_1.openSync)(`${(0, path_1.join)(__dirname, "../../metadata.txt")}`, "a+");
        const rawMetadata = (0, fs_1.readFileSync)(file, "utf-8");
        (0, fs_1.closeSync)(file);
        const metadata = JSON.parse(rawMetadata);
        return metadata;
    }
    catch (error) {
        return null;
    }
};
exports.getMetadata = getMetadata;
const setPosition = (position) => {
    let metadata = (0, exports.getMetadata)();
    console.log("metadata", metadata);
    if (!metadata)
        metadata = {};
    metadata.windowPosition = position;
    const file = (0, fs_1.openSync)(`${(0, path_1.join)(__dirname, "../../metadata.txt")}`, "w");
    (0, fs_1.writeSync)(file, JSON.stringify(metadata));
    (0, fs_1.closeSync)(file);
};
exports.setPosition = setPosition;
const getPosition = () => {
    var _a, _b;
    return (_b = (_a = (0, exports.getMetadata)()) === null || _a === void 0 ? void 0 : _a.windowPosition) !== null && _b !== void 0 ? _b : null;
};
exports.getPosition = getPosition;
const getDimensions = () => {
    var _a, _b;
    return (_b = (_a = (0, exports.getMetadata)()) === null || _a === void 0 ? void 0 : _a.windowDimensions) !== null && _b !== void 0 ? _b : null;
};
exports.getDimensions = getDimensions;
const setDimensions = (dimensions) => {
    let metadata = (0, exports.getMetadata)();
    if (!metadata)
        metadata = {};
    metadata.windowDimensions = dimensions;
    const file = (0, fs_1.openSync)(`${(0, path_1.join)(__dirname, "../../metadata.txt")}`, "w");
    (0, fs_1.writeSync)(file, JSON.stringify(metadata));
    (0, fs_1.closeSync)(file);
};
exports.setDimensions = setDimensions;
