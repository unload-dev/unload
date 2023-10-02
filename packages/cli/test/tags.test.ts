import { Command } from "commander";
import { expect, it, beforeEach } from "vitest";

it("renders correctly", () => {
  const program = new Command();
  try {
    const result = program.parse([
      "node-ts",
      "index.ts",
      "tags",
      "list",
      "unload/alpine",
    ]);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
});
