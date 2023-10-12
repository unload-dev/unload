export { DigitalOceanProvider } from "./digitalOcean";
export { RegistryProvider, Repository } from "./registryProvider";

export const Provider = {
  digitalOcean: "DigitalOcean",
  dockerRegistryV2: "Docker Registry V2",
} as const;
export type Provider = (typeof Provider)[keyof typeof Provider];
