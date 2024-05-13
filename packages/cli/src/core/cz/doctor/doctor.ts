import { errorToast, warningToast } from '../../../utils/errorToast'
import { isFileExists } from '../../../utils/fsUtils'
import { execSync } from 'child_process'
import chalk from 'chalk'

class Doctor {
  runBaseDoctor() {
    try {
      isFileExists(process.cwd(), 'package.json')
      console.log(chalk.green('\npackage.json ✅'))
    } catch (error) {
      errorToast('❌ No package.json found in your project')
    }
    try {
      isFileExists(process.cwd(), 'node_modules')
      console.log(chalk.green('\nnode_modules ✅'))
    } catch (error) {
      errorToast('❌ Did not install the dependencies yet')
    }
    
    try {
      isFileExists(process.cwd(), 'node_modules')
      console.log(chalk.green('\nnode_modules ✅'))
    } catch (error) {
      errorToast('❌ Did not install the dependencies yet')
    }
    return Promise
  }
  runDependencyManagerDoctor() {
    const isYarn = isFileExists(process.cwd(), 'yarn.lock')
    const isPnpm = isFileExists(process.cwd(), 'pnpm-lock.yaml')
    let packageManager: 'npm' | 'pnpm' | 'yarn' = 'npm'
    try {
      execSync('npm --version')
      packageManager = 'npm'
    } catch (error) {
      errorToast(
        'You Package manager is npm , but we do not find npm in your system \n so here we start to using npm manager'
      )
      process.exit()
    }
    if (isYarn) {
      try {
        execSync('yarn --version')
        packageManager = 'yarn'
        console.log(chalk.green('\nyarn ✅\n'))
      } catch (error) {
        warningToast(
          'You Package manager is Yarn , but we do not find yarn in your system \n so here we start to using npm manager'
        )
        packageManager = 'npm'
      }
    } else if (isPnpm) {
      try {
        execSync('pnpm --version')
        packageManager = 'pnpm'
        console.log(chalk.green('\npnpm ✅\n'))
      } catch (error) {
        warningToast(
          'You Package manager is Pnpm , but we do not find Pnpm in your system \n so here we start to using npm manager'
        )
        packageManager = 'npm'
      }
    }
    return packageManager
  }
}
export { Doctor }
