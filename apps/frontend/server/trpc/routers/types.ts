import { Repository as ClientRepository } from "@unload/registry-client";

export interface Registry {
  name: string;
  type: string;
  repositories: number;
  connected: boolean;
}

export interface Repository extends ClientRepository {
  registry: string;
}
