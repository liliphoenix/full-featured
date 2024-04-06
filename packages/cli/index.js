#!/usr/bin/env node
const init = require("./src/create");
const argv = require("minimist")(process.argv.slice(2));
const program = require("./src/basic");
// init(argv._[0], argv.temp);

program.parse();
