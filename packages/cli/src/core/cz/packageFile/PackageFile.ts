import { spawn } from 'child_process'
import { PackageJson } from '../../../types/packageType'
import { isFileExists, writeFile } from '../../../utils/fsUtils'
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
    // 🌸 收集用户的需求
    this.packageFile = packageJson
    this.ShouldInstallDependencies = []
    this.packageManager = 'npm'
    // 🌸 是否使用git
    this.useGit = useGit
    // 🌸 是否使用ESlint和prettier
    this.useEsPre = useEsPre
  }
  runDoctor(type: string) {
    const doctor = new Doctor()
    switch (type) {
      case 'base':
        doctor.runBaseDoctor()
        break;
      case 'dependency_modules':
        this.packageManager = doctor.runDependencyManagerDoctor()
        break;
    }
  }
  addScript() {
    // 🌸 使用 git的话 

    if (this.useGit) {
      //( 🌸 --> git init
      const hasGit = isFileExists(process.cwd(), '.git')
      hasGit || spawn('git', ['init'], {
        cwd: process.cwd(),
        stdio: 'inherit'
      })
    }
    // 🌸 给package.json添加type类型
    this.packageFile = {
      ...this.packageFile,
      type: 'module'
    }
    // 🌸 使用ESlint和prettier
    const writeScript = () => {
      // 🌸 写入一件提交代码脚本
      this.packageFile.scripts = {
        ...this.packageFile.scripts,
        commit: 'git add . && ./node_modules/full-featured-cz/standalone.js'
      }
      // 🌸 写入脚本
      if (this.useEsPre) {
        this.packageFile.scripts = {
          ...this.packageFile.scripts,
          lint: 'eslint ./src --ext .ts --fix',
          format: 'prettier --write "./**/*.{html,vue,ts,js,json,md}"'
        }
      }
      writeFile(
        joinPath(process.cwd(), 'package.json'),
        JSON.stringify(this.packageFile, null, 2),
        'package.json'
      )
      // 
      this.scanDependencies()
    }
    //🌸 运行doctor检查 第三方包和package.
    this.runDoctor('base')
    writeScript()
  }
  scanDependencies() {
    // 🌸 扫描配置文件，返回是否存在的一个配置对象
    this.ShouldInstallDependencies = getDependencies([
      'full-featured-cz',
      'commitlint-config-gitmoji',
      this.useGit ? 'husky' : '',
      this.useEsPre ? 'eslint' : '',
      this.useEsPre ? '@typescript-eslint/eslint-plugin' : '',
      this.useEsPre ? 'prettier' : '',
      this.useEsPre ? '@typescript-eslint/parser' : ''
    ])
    // 🌸 如果需要安装的依赖数为0的话，那么就直接写入配置文件即可
    if (this.ShouldInstallDependencies.length === 0) {
      this.writeConfig()
    } else {
      // 🌸 写入依赖并且安装依赖
      this.writeConfig()
      this.installDependencies()
    }
  }
  installDependencies() {
    this.runDoctor('dependency_modules')
    console.log(this.packageManager);

    spawn(
      this.packageManager,
      [
        this.packageManager == 'npm' ? 'install' : 'add',
        ...this.ShouldInstallDependencies,
        '--dev-save'
      ],
      {
        cwd: process.cwd(),
        stdio: 'inherit'
      }
    )
  }
  writeConfig() {

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
