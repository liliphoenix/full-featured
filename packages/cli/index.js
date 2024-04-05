#!/usr/bin/env node
const command = require("./src/command");
const init = require("./src/create");
const argv = require("minimist")(process.argv.slice(2));
console.log(argv);
init(argv._[0], argv.temp);
command();
