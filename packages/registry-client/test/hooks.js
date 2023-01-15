/**
 * Start the docker registry before each test is run.
 */
const https = require("https");
const path = require("path");
const composeUtils = require("./utils/docker-compose");
const axios = require("axios");
const axiosRetry = require("axios-retry");

const dockerApiUrl = "https://localhost:5001";

const agent = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

axiosRetry(agent, {
  retries: 10,
  // multiply delay by 0.1 because it uses 100 ms steps and 10 ms should be good for this use case
  retryDelay: (count) => axiosRetry.exponentialDelay(count) * 0.1,
});

exports.mochaHooks = {
  async beforeEach() {
    try {
      await composeUtils.upAll();

      // Important: make sure the http api is online
      await agent.get(dockerApiUrl);
    } catch (err) {
      console.log("something went wrong:", err.message);
    }
  },
  async afterEach() {
    try {
      await composeUtils.down();
    } catch (err) {
      console.log("something went wrong:", err.message);
    }
  },
};
