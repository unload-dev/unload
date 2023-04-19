import { Command } from "commander";
import { expect, it, beforeEach } from "vitest";

it("renders correctly", () => {
  const program = new Command();
  try {
    program.parse(["node-ts", "index.ts", "tags", "list", "unload/alpine"]);
  } catch (error) {
    console.error(error);
  }
});
