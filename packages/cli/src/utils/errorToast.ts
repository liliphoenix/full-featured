import chalk from 'chalk'

function errorToast(msg: string) {
  console.error(chalk.red(`Error:${msg}!`))
  process.exit()
}

function warningToast(msg: string) {
  console.log(chalk.yellow(`Warning:${msg}!`))
}

function successToast(msg: string) {
  console.log(chalk.green(`Success:${msg}!`))
}

export { errorToast, warningToast, successToast }
