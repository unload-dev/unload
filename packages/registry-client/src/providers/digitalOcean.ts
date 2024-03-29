import * as httpSecure from "node:https";
import { default as axios, Axios, AxiosResponse } from "axios";
import { RegistryProvider, Repository } from "./registryProvider";

export class DigitalOceanProvider implements RegistryProvider {
  public readonly name: string = "digitalocean";

  private readonly url: string = "api.digitalocean.com";
  private readonly https: boolean = true;
  private readonly skipTlsVerify: boolean = false;

  public namespace: string;
  private apiClient: Axios;

  constructor(namespace: string, token: string) {
    if (
      !token.startsWith("dop_v1_") &&
      !token.startsWith("doo_v1_") &&
      !token.startsWith("dor_v1_")
    ) {
      throw new Error(
        "Invalid token. Token should start with 'dop_v1_', 'dop_v1_' or 'dor_v1_'"
      );
    }

    this.namespace = namespace;

    const scheme = this.https ? "https" : "http";
    const headers = { Authorization: `Bearer ${token}` };

    this.apiClient = axios.create({
      baseURL: `${scheme}://${this.url}`,
      headers,
      httpsAgent: new httpSecure.Agent({
        rejectUnauthorized: !this.skipTlsVerify,
      }),
    });
  }

  private async sendRequest(request): Promise<AxiosResponse<any, any>> {
    try {
      const response = await this.apiClient.request({
        ...request,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Ping the registry server
   * @returns
   */
  async ping(): Promise<boolean> {
    try {
      const { data } = await this.sendRequest({
        url: "/v2/registry",
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async getRepositories(): Promise<Repository[]> {
    const { data } = await this.sendRequest({
      url: `/v2/registry/${this.namespace}/repositoriesV2`,
    });

    const repositories = data.repositories.map((repo) => {
      return {
        name: repo.name,
        manifest_count: repo.manifest_count,
        tag_count: repo.tag_count,
        last_tag: repo.latest_manifest.tags[0],
        updated_at: Date.parse(repo.latest_manifest.updated_at),
      };
    });
    return repositories;
  }

  async getTags(repository: string): Promise<string[]> {
    const escapedRepositoryName = encodeURIComponent(repository);

    const { data } = await this.sendRequest({
      url: `/v2/registry/${this.namespace}/repositories/${escapedRepositoryName}/tags`,
    });

    const tags = data.tags.map((tag) => tag.tag);

    return tags;
  }

  async getTag(repository: string, tag: string): Promise<string> {
    return "";
  }

  async deleteTag(repository: string, tag: string): Promise<void> {
    return;
  }

  async getDigest(repository: string, tag: string): Promise<string> {
    return "";
  }

  async deleteDigest(repository: string, tag: string): Promise<void> {
    return;
  }
}
