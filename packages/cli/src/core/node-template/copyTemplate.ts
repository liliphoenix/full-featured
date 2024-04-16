import { ensureDirExtra } from "../../utils/fsUtils";

function copyTemplate(path: string) {
  console.log(ensureDirExtra(path));
}
export { copyTemplate };
