#!/usr/bin/env node
const { Command } = require("commander");
const program = new Command();
program.option("-d", "666");
program
  .name("string-util")
  .description("CLI to some JavaScript string utilities")
  .version("0.8.0");
