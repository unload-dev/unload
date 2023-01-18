#! /usr/bin/env node

import { Command } from "commander";
const program = new Command();
import tags from "./commands/tags";

console.log(tags);

program
  .name("unload")
  .version("1.0.0")
  .description("A CLI for the unload.dev services");

program.addCommand(tags.makeTagsCommand());

program.parse(process.argv);
