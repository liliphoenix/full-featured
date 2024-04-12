import fs from "fs";

function isFileExists(root: string, PackageManager: string) {
  try {
    const filePath = `${root}/${PackageManager}`;
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
}

function readJsonFile<T>(root: string) {
  const data = fs.readFileSync(root).toString();
  return JSON.parse(data) as T;
}

export { isFileExists, readJsonFile };
