import {IDictionaryResponse} from "../services/api-client";

export class Dictionaries {
  currencies: IDictionaryResponse | undefined;
  categories: IDictionaryResponse | undefined;
  roles: IDictionaryResponse | undefined;
  tariffs: IDictionaryResponse | undefined;
}
