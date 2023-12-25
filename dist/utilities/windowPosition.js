'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
const fs_1 = require('fs');
const path_1 = require('path');
const setPosition = (position) => {
  const file = (0, fs_1.openSync)(`${(0, path_1.join)(__dirname, '../../position.txt')}`, 'w');
  (0, fs_1.writeSync)(file, position.toString());
  (0, fs_1.closeSync)(file);
};
const getPosition = () => {
  const file = (0, fs_1.openSync)(`${(0, path_1.join)(__dirname, '../../position.txt')}`, 'r');
  const position = (0, fs_1.readFileSync)(file, 'utf-8');
  (0, fs_1.closeSync)(file);
  return position;
};
exports.default = {
  setPosition,
  getPosition,
};
