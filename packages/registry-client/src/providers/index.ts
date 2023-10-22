export { DigitalOceanProvider } from "./digitalOcean";
export { RegistryProvider, Repository } from "./registryProvider";

export const Provider = {
  digitalOcean: "digitalOcean",
  dockerRegistryV2: "dockerRegistryV2",
  dockerHub: "dockerHub",
  github: "github",
} as const;
export type Provider = (typeof Provider)[keyof typeof Provider];
