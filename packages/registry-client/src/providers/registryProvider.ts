export interface TokenAuthentication {
  token: string;
}

export interface BasicAuthentication {
  username: string;
  password: string;
}

export interface Repository {
  name: string;
  manifest_count: number;
  tag_count: number;
  last_tag: string;
  updated_at: Date;
}

export interface RegistryProvider {
  name: string;

  /**
   * Supported by:
   * - Docker Registry V2
   * - Digital Ocean Registry
   * - Docker Hub
   * - GitHub Container Registry
   *
   */
  ping(): Promise<boolean>;
  getRepositories(): Promise<Repository[]>;
  getTags(repository: string): Promise<string[]>;
  getTag(repository: string, tag: string): Promise<string>;
  deleteTag(repository: string, tag: string): Promise<void>;
  getDigest(repository: string, tag: string): Promise<string>;
  deleteDigest(repository: string, tag: string): Promise<void>;
}
