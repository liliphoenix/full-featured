import path from "path";

function getPwdPath() {
  return process.cwd();
}
function joinPath(filepath: string) {
  return path.join(...filepath);
}
export { getPwdPath, joinPath };
