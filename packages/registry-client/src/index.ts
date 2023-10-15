import {
  Provider,
  Repository,
  RegistryProvider,
  DigitalOceanProvider,
} from "./providers";

export { Provider, Repository };

export interface RegistryOptions {
  name: string;
  token: string;
}

export class RegistryClient {
  public static create(
    provider: Provider,
    options: RegistryOptions
  ): RegistryProvider {
    switch (provider) {
      case Provider.digitalOcean:
        return new DigitalOceanProvider(options.name, options.token);
    }
  }
}
