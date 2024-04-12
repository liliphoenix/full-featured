import path from "path";
import { fileURLToPath } from "url";

function getPwdPath() {
  return process.cwd();
}
function joinPath(...filepath: string[]) {
  return path.join(...filepath);
}
function posixDirname(filepath: string) {
  return path.posix.dirname(filepath);
}
function splitPosixPath(pth: string) {
  return pth.split(path.posix.sep);
}
function posixPathJoin(...pth: string[]) {
  return path.posix.join(...pth);
}
function findSpecifiedDirectories(pth: string, target: string): string[] {
  const dirs = splitPosixPath(pth);
  const res: string[] = [];
  let parent = "";
  dirs.forEach((dir) => {
    parent = posixPathJoin(parent, dir);

    if (dir === target) {
      res.push(parent);
    }
  });

  return res;
}
function ESdirname() {
  const __filenameNew = fileURLToPath(import.meta.url);

  return path.dirname(__filenameNew);
}

export {
  getPwdPath,
  joinPath,
  posixDirname,
  findSpecifiedDirectories,
  posixPathJoin,
  splitPosixPath,
  ESdirname,
};
