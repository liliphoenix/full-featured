import { errorToast, warningToast } from "../utils/errorToast";
import { isDirectoryExists } from "../utils/fsUtils";

function parseConfig(root: string, depth: number) {
  const config = {
    root: root,
    depth: depth,
  };

  if (!config.root) {
    config.root = process.cwd();
  } else {
    isDirectoryExists(root);
  }
  if (config.depth < 0) {
    errorToast("depth must be an negative integer");
  } else if (!config.depth) {
    warningToast(
      "\nyour limitDepth does not set! The default settings of depth is 5"
    );
    config.depth = 5;
  }
  return config;
}

export { parseConfig };
