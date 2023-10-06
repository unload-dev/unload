import { expect, test } from "vitest";
import { DigitalOcean } from "../../src/providers";

const token = process.env.DIGITALOCEAN_ACCESS_TOKEN;
if (!token) {
  throw new Error(`Invalid digitalOcean access token`);
}

const client = new DigitalOcean(token);

test("ping registry", async () => {
  const ping = await client.ping();
  expect(ping).toBeTruthy();
});

// test("get all image tags", async () => {
//   expect(false).toBeTruthy();
// });

// test("get single image tag", async () => {
//   expect(false).toBeTruthy();
// });

// test("get image digest", async () => {
//   expect(false).toBeTruthy();
// });

// test("delete image digest", async () => {
//   expect(false).toBeTruthy();
// });
