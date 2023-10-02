import { Command } from "commander";
const DRC = require("@unload/registry-client");

const options = {
  repository: "registry.digitalocean.com",
  https: true,
  insecure: false,
  auth: {
    username:
      "dop_v1_d8784884f1d9330706dfbc807fb55c47a44e5f27ab6d9d8ca291952e2b0b2c5b",
    password:
      "dop_v1_d8784884f1d9330706dfbc807fb55c47a44e5f27ab6d9d8ca291952e2b0b2c5b",
  },
};

function makeTagsCommand() {
  const tags = new Command("tags");
  tags
    .command("list <respository>")
    .description("List all tags of a repository")
    .action(async (respository) => {
      const drc = new DRC(options);
      try {
        const response = await drc.getTags(respository);
        console.table(response);
      } catch (err) {
        console.error(err);
        console.error("Can't access tags");
      }
    });

  return tags;
}

export default { makeTagsCommand };
