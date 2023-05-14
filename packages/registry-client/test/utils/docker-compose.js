const path = require("path");
const compose = require("docker-compose");

const options = {
  cwd: path.join(__dirname, "..", "docker-compose", "secure"),
  log: false,
};
const container = "registry";

async function getRegistrySize() {
  const { out } = await compose.exec(
    container,
    "du -sb /var/lib/registry",
    options
  );
  return Number.parseInt(out.split("\t")[0]);
}

async function runGarbageCollector() {
  const command =
    "bin/registry garbage-collect /etc/docker/registry/config.yml";
  await compose.exec(container, command, options);
}

async function prepare() {
  // TODO this should build the registry from scratch if not found locally
  // await compose.pullAll(options);
}

async function upAll() {
  await compose.upAll(options);
}

async function down() {
  await compose.down(options);
}

module.exports = {
  getRegistrySize,
  runGarbageCollector,
  upAll,
  down,
  prepare,
};
