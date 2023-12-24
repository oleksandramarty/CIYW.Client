import {environment} from "../environments/environment";
import {evnTypeProvider} from "../constants/common.constant";

export function isLocalEnv(): boolean {
  return environment ? environment.name === evnTypeProvider.local : false;
}

export function isDevEnv(): boolean {
  return environment ? environment.name === evnTypeProvider.dev : false;
}

export function isProdEnv(): boolean {
  return environment ? environment.name === evnTypeProvider.prod : false;
}
