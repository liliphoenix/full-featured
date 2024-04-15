import fs from "fs";
import { errorToast, successToast } from "./errorToast";

function isFileExists(root: string, PackageManager: string) {
  try {
    const filePath = `${root}/${PackageManager}`;
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
}
function isDirectoryExists(pth: string) {
  try {
    const isExists = fs.existsSync(pth);
    if (!isExists) {
      errorToast("such directory does not exists");
    }
    return true;
  } catch (error) {
    return false;
  }
}

function writeFile(path: string, data: string) {
  try {
    fs.writeFile(path, data, () => {});
    successToast("Write file success!");
  } catch (error) {}
}
function readJsonFile<T>(root: string) {
  const data = fs.readFileSync(root).toString();
  return JSON.parse(data) as T;
}

export { isFileExists, readJsonFile, isDirectoryExists, writeFile };
