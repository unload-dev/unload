import { Command } from "commander";
const DRC = require("@unload/registry-client");

const options = {
  repository: "localhost:5001",
  https: true,
  insecure: true,
  auth: {
    username: "testuser",
    password: "testpassword",
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
        console.error("Can't access tags");
      }
    });

  return tags;
}

export default { makeTagsCommand };
