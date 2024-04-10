import chalk from "chalk";

function errorToast(msg: string) {
  console.log(chalk.red(`Error:${msg}!`));
}

function warningToast(msg: string) {
  console.log(chalk.yellow(`Warning:${msg}!`));
}

function successToast(msg: string) {
  console.log(chalk.green(`Warning:${msg}!`));
}

export { errorToast, warningToast, successToast };
