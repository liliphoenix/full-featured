export type ScriptMap = { [name: string]: string };
export interface PackageJson {
  name: string;
  version: string;
  script: string;
  license?: string | object[];
  scripts: ScriptMap;
  husky?: ScriptMap;
}
