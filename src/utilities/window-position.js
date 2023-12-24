const fs = require("fs");
const path = require("path");

const setPosition = (position) => {
  const file = fs.openSync(
    `${path.join(__dirname, "../../position.txt")}`,
    "w"
  );
  fs.writeSync(file, position.toString());
  fs.closeSync(file);
};

const getPosition = () => {
  const file = fs.openSync(
    `${path.join(__dirname, "../../position.txt")}`,
    "r"
  );
  const position = fs.readFileSync(file, "utf-8");
  fs.closeSync(file);
  return position;
};

// export

module.exports = {
  setPosition,
  getPosition,
};
