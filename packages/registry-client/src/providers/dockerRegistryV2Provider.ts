import * as httpSecure from "node:https";
import { AxiosInstance, default as axios } from "axios";

export class DockerRegistryV2Provider {
  #http: AxiosInstance;

  constructor({
    repository = "hub.docker.com",
    https = true,
    insecure = false,
    auth = undefined,
  }) {
    const scheme = https ? "https" : "http";
    this.#http = axios.create({
      baseURL: `${scheme}://${repository}`,
      httpsAgent: new httpSecure.Agent({
        rejectUnauthorized: !insecure,
      }),
      auth,
    });
  }

  async sendRequest(request) {
    try {
      const response = await this.#http({
        ...request,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async ping() {
    const request = {
      url: `/v2/`,
    };
    const response = await this.sendRequest(request);
    return response;
  }

  async getTags(repository) {
    const request = {
      url: `/v2/${repository}/tags/list`,
    };
    const { data } = await this.sendRequest(request);
    return data.tags;
  }

  async getManifest(repository, reference) {
    const request = {
      url: `/v2/${repository}/manifests/${reference}`,
      headers: {
        Accept: "application/vnd.docker.distribution.manifest.v2+json",
      },
    };
    const { data, headers } = await this.sendRequest(request);
    return { ...data, digest: headers["docker-content-digest"] };
  }

  async deleteManifest(repository, reference) {
    const request = {
      method: "DELETE",
      url: `/v2/${repository}/manifests/${reference}`,
      headers: {
        Accept: "application/vnd.docker.distribution.manifest.v2+json",
      },
    };
    const response = await this.sendRequest(request);
    return response;
  }
}
