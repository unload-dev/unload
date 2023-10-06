import * as httpSecure from "node:https";
import { default as axios, Axios, AxiosResponse } from "axios";
import { RegistryProvider } from "./registryProvider";

export class DigitalOcean implements RegistryProvider {
  public readonly name: string = "digitalocean";

  private readonly url: string = "api.digitalocean.com";
  private readonly https: boolean = true;
  private readonly skipTlsVerify: boolean = false;

  private apiClient: Axios;

  constructor(token: string) {
    if (
      !token.startsWith("dop_v1_") &&
      !token.startsWith("doo_v1_") &&
      !token.startsWith("dor_v1_")
    ) {
      throw new Error(
        "Invalid token. Token should start with 'dop_v1_', 'dop_v1_' or 'dor_v1_'"
      );
    }
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
      console.log(data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getTags(repository: string): Promise<string[]> {
    return [""];
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
