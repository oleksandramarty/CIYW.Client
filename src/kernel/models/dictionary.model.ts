import {
  IGuidDictionaryResponse,
  IStringDictionaryItemResponse,
  IStringDictionaryResponse
} from "../services/api-client";

export class Dictionaries {
  currencies: IGuidDictionaryResponse | undefined;
  categories: IGuidDictionaryResponse | undefined;
  roles: IGuidDictionaryResponse | undefined;
  tariffs: IGuidDictionaryResponse | undefined;
  invoiceTypes: IStringDictionaryResponse | undefined;
}
