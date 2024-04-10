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

function readJsonFile(root: string) {
  fs.readFileSync(root);
}

export { isFileExists };
