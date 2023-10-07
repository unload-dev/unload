import { expect, test } from "vitest";
import { DigitalOcean } from "../../src/providers";

const token = process.env.DIGITALOCEAN_ACCESS_TOKEN;
if (!token) {
  throw new Error(`Invalid digitalOcean access token`);
}

const client = new DigitalOcean("unload", token);

test("ping registry", async () => {
  const ping = await client.ping();
  expect(ping).toBeTruthy();
});

test("get all repositories", async () => {
  const expectedRepositories = ["alpine"];
  const repositories = await client.getRepositories();
  expect(repositories).toStrictEqual(expectedRepositories);
});

test("get all image tags", async () => {
  const expectedTags = ["3.15", "3.18.2", "3.18.3"];
  const tags = await client.getTags("alpine");
  expect(expectedTags.sort()).toStrictEqual(tags.sort());
});

// test("get single image tag", async () => {
//   expect(false).toBeTruthy();
// });

// test("get image digest", async () => {
//   expect(false).toBeTruthy();
// });

// test("delete image digest", async () => {
//   expect(false).toBeTruthy();
// });
