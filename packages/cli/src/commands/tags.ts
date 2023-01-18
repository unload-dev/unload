import { Command } from "commander";

function makeTagsCommand() {
  const tags = new Command("tags");
  tags
    .command("list")
    .action(() => console.log("list tags"))
    .command("delete")
    .action(() => console.log("delete tags"));

  return tags;
}

export default { makeTagsCommand };
