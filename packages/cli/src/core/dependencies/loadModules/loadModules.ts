import { readJsonFile } from '../../../utils/fsUtils'
import { joinPath, posixDirname } from '../../../utils/pathUtils'
import { Root, PackageJson, PackagesSet } from '../../../types/PackageJson'
import { globSync } from 'glob'
import { npmModulesGlobRules } from '../glob-rules/npmModulesRules'

export function loadNpmModules(root: string): PackagesSet<PackageJson> {
  const packageSet: PackagesSet<PackageJson> = {}

  packageSet[Root] = readJsonFile<PackageJson>(joinPath(root, 'package.json'))
  const pathList = globSync([...npmModulesGlobRules], {
    cwd: root,
    posix: true
  })

  pathList.forEach((path) => {
    packageSet[posixDirname(path)] = readJsonFile<PackageJson>(
      joinPath(root, path)
    )
  })

  return packageSet
}
