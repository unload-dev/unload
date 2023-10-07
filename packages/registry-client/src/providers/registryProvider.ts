export interface RegistryProvider {
  name: string;

  ping(): Promise<boolean>;
  getRepositories(): Promise<string[]>;
  getTags(repository: string): Promise<string[]>;
  getTag(repository: string, tag: string): Promise<string>;
  deleteTag(repository: string, tag: string): Promise<void>;
  getDigest(repository: string, tag: string): Promise<string>;
  deleteDigest(repository: string, tag: string): Promise<void>;
}
