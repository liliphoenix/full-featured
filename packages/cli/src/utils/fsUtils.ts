import fs from 'fs'
import { errorToast, successToast } from './errorToast'
import fsEx from 'fs-extra'

function ensureDirExtra(path: string) {
  try {
    fsEx.ensureDir(path)
  } catch (error) {
    errorToast('No such file ro directory found')
    process.exit()
  }
}
function isFileExists(root: string, PackageManager: string) {
  try {
    const filePath = `${root}/${PackageManager}`
    fs.accessSync(filePath, fs.constants.F_OK)
    return true
  } catch (error) {
    return false
  }
}
function isDirectoryExists(pth: string) {
  try {
    const isExists = fs.existsSync(pth)
    if (!isExists) {
      errorToast('such directory does not exists')
    }
    return true
  } catch (error) {
    return false
  }
}

function writeFile(path: string, data: string) {
  try {
    fs.writeFile(path, data, () => {})
    successToast('Write file success!')
  } catch (error) {
    errorToast('failed to write')
    process.exit()
  }
}
function readJsonFile<T>(root: string) {
  const data = fs.readFileSync(root).toString()
  return JSON.parse(data) as T
}
function copyFileEx(temp: string, target: string) {
  fsEx.copy(temp, target)
}
function mkDirEx(path: string) {
  fsEx.mkdir(path)
}
export {
  mkDirEx,
  isFileExists,
  readJsonFile,
  isDirectoryExists,
  writeFile,
  ensureDirExtra,
  copyFileEx
}
