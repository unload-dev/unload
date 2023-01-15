const composeUtils = require("./utils/docker-compose");
const { expect } = require("chai");
const DRC = require("..");

const options = {
  repository: "localhost:5001",
  https: true,
  insecure: true,
  auth: {
    username: "testuser",
    password: "testpassword",
  },
};

const repositoryName = "unload/alpine";
const expectedTags = ["3.14.0", "3.15.3", "3.16.0"];

// We need to fetch the digests every time we create new test data because they change every time
async function getImages() {
  const initDrc = new DRC(options);
  return await Promise.all(
    expectedTags.map(async (tag) => {
      try {
        const { digest } = await initDrc.getManifest(repositoryName, tag);
        return {
          tag,
          digest,
        };
      } catch (error) {
        if (error.response?.status === 404) {
          throw new Error(`Tag ${repositoryName}:${tag} not found in registry`);
        } else {
          throw error;
        }
      }
    })
  );
}

function getImage(images, tag) {
  return images.find((i) => i.tag === tag.toString());
}

beforeEach(async function () {
  this.images = await getImages();
});

describe("Test getters", function () {
  it("should implement the V2 registry API", async function () {
    const drc = new DRC(options);
    const response = await drc.ping();

    expect(response.status).to.eql(200);
    expect(response.headers["docker-distribution-api-version"]).to.eql(
      "registry/2.0"
    );
  });

  it("should return all tags from a repository", async function () {
    const drc = new DRC(options);
    const tags = await drc.getTags(repositoryName);

    expect(tags).to.be.an("array");
    expect(tags).to.have.members(expectedTags);
  });

  it(`sould return the manifest via tag 'unload/alpine:${expectedTags[0]}'`, async function () {
    const image = getImage(this.images, expectedTags[0]);
    const drc = new DRC(options);
    const manifest = await drc.getManifest(repositoryName, image.tag);

    expect(manifest.schemaVersion).to.eql(2);
    expect(manifest.digest).to.eql(image.digest);
  });
});

describe("Delete manifest", function () {
  it("should delete the manifest via digest", async function () {
    const removeTag = expectedTags[0];
    const image = getImage(this.images, removeTag);

    const drc = new DRC(options);
    const response = await drc.deleteManifest(repositoryName, image.digest);

    expect(response.status).to.eql(202);

    const tags = await drc.getTags(repositoryName);

    expect(tags).to.be.an("array");
    expect(tags).to.have.members(
      expectedTags.filter((tag) => tag !== removeTag)
    );
  });
});

describe("Garbage Collection", function () {
  it("should reduce filesystem size", async function () {
    const removeTag = expectedTags[0];
    const image = getImage(this.images, removeTag);

    const initialSize = await composeUtils.getRegistrySize();

    const drc = new DRC(options);
    await drc.deleteManifest(repositoryName, image.digest);

    await composeUtils.runGarbageCollector();
    const finalSize = await composeUtils.getRegistrySize();

    expect(finalSize).to.be.below(initialSize);
  });
});
