#!/usr/bin/env node

const { program } = require("commander");
const fs = require("fs");
program
  .version("1.0.0", "-v, --version")
  .description("A simple CLI tool")
  .option("-n, --name <name>", "Your Name");

program.parse(process.argv);

fs.mkdirSync("template");
