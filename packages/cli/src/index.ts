#! /usr/bin/env node

import { Command } from "commander";
import tags from "./commands/tags";

const program = new Command();

program
  .name("unload")
  .version("1.0.0")
  .description("A CLI for the unload.dev services");

program.addCommand(tags.makeTagsCommand());
program.showHelpAfterError();

program.parse(process.argv);
