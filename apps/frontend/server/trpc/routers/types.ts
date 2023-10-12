import { Repository as ClientRepository } from "@unload/registry-client";

export interface Registry {
  name: string;
  type: string;
  repositories: number;
}

export interface Repository extends ClientRepository {
  registry: string;
}
