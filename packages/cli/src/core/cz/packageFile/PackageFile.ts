import { spawn } from 'child_process'
import { PackageJson } from '../../../types/packageType'
import { writeFile } from '../../../utils/fsUtils'
import { getDependencies } from '../../../utils/getDependencies'
import { joinPath } from '../../../utils/pathUtils'
import {
  WriteCommitlintConfig,
  WriteCzConfig,
  WriteEslintConfig,
  WriteHuskyConfig,
  WritePrettierConfig
} from '../configFile/configFile'
import { Doctor } from '../doctor/doctor'
class PackageFile {
  packageFile: PackageJson
  ShouldInstallDependencies: string[]
  packageManager: 'npm' | 'pnpm' | 'yarn'
  useGit: boolean
  useEsPre: boolean
  constructor(packageJson: PackageJson, useGit: boolean, useEsPre: boolean) {
    this.packageFile = packageJson
    this.ShouldInstallDependencies = []
    this.packageManager = 'npm'
    this.useGit = useGit
    this.useEsPre = useEsPre
  }
  runDoctor(type: string) {
    const doctor = new Doctor()
    if (type === 'base') {
      doctor.runBaseDoctor()
    } else if (type === 'dependency_modules') {
      this.packageManager = doctor.runDependencyManagerDoctor()
    }
  }
  addScript() {
    if (this.useGit) {
      spawn('git', ['init'], {
        cwd: process.cwd(),
        stdio: 'inherit'
      })
    }

    this.packageFile = {
      ...this.packageFile,
      type: 'module'
    }
    const writeScript = () => {
      this.packageFile.scripts = {
        ...this.packageFile.scripts,
        commit: 'git add . && ./node_modules/full-featured-cz/standalone.js'
      }

      if (this.useEsPre) {
        this.packageFile.scripts = {
          ...this.packageFile.scripts,
          lint: 'eslint ./src --ext .ts --fix',
          format: 'prettier --write "./**/*.{html,vue,ts,js,json,md}"'
        }
      }
      writeFile(
        joinPath(process.cwd(), 'package.json'),
        JSON.stringify(this.packageFile, null, 2)
      )
      this.scanDependencies()
    }
    this.runDoctor('base')

    writeScript()
  }
  scanDependencies() {
    this.ShouldInstallDependencies = getDependencies([
      'full-featured-cz',
      'commitlint-config-gitmoji',
      this.useGit ? 'husky' : '',
      this.useEsPre ? 'eslint' : '',
      this.useEsPre ? '@typescript-eslint/eslint-plugin' : '',
      this.useEsPre ? 'prettier' : '',
      this.useEsPre ? '@typescript-eslint/parser' : ''
    ])
    if (this.ShouldInstallDependencies.length === 0) {
      this.writeConfig()
    } else {
      this.writeConfig()
      this.installDependencies()
    }
  }
  installDependencies() {
    this.runDoctor('dependency_modules')
    spawn(
      this.packageManager,
      ['install', ...this.ShouldInstallDependencies, '-D'],
      {
        cwd: process.cwd(),
        stdio: 'inherit'
      }
    )
  }
  writeConfig() {
    console.log(this.useGit)

    if (this.useGit) {
      const installProcess = spawn('npx', ['husky', 'install'], {
        cwd: process.cwd(),
        stdio: 'inherit'
      })
      installProcess.on('close', () => {
        WriteHuskyConfig()
      })
    }
    if (this.useEsPre) {
      WriteEslintConfig()
      WritePrettierConfig()
    }
    WriteCzConfig()
    WriteCommitlintConfig()
  }
}
export { PackageFile }
