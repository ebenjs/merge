import { openSync, writeSync, closeSync, readFileSync } from "fs";
import { join } from "path";
import { IMetadata, IWindowDimensions, IWindowPosition } from "..";

export const getMetadata = (): IMetadata | null => {
  try {
    const file = openSync(`${join(__dirname, "../../metadata.txt")}`, "a+");
    const rawMetadata = readFileSync(file, "utf-8");
    closeSync(file);
    const metadata = JSON.parse(rawMetadata) as IMetadata;
    return metadata;
  } catch (error) {
    return null;
  }
};

export const setPosition = (position: IWindowPosition): void => {
  let metadata = getMetadata();
  console.log("metadata", metadata);

  if (!metadata) metadata = {} as IMetadata;

  metadata.windowPosition = position;
  const file = openSync(`${join(__dirname, "../../metadata.txt")}`, "w");
  writeSync(file, JSON.stringify(metadata));
  closeSync(file);
};

export const getPosition = (): IWindowPosition | null => {
  return getMetadata()?.windowPosition ?? null;
};

export const getDimensions = (): IWindowDimensions | null => {
  return getMetadata()?.windowDimensions ?? null;
};

export const setDimensions = (dimensions: IWindowDimensions): void => {
  let metadata = getMetadata();

  if (!metadata) metadata = {} as IMetadata;

  metadata.windowDimensions = dimensions;
  const file = openSync(`${join(__dirname, "../../metadata.txt")}`, "w");
  writeSync(file, JSON.stringify(metadata));
  closeSync(file);
};
