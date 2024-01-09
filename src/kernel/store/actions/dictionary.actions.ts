import {IDictionariesResponse, ITokenResponse} from "../../services/api-client";

export class SetDictionaries {
  static type = '[Dictionaries] SetDictionaries'
  constructor(public data: IDictionariesResponse) {}
}

export class ResetDictionaries {
  static type = '[Dictionaries] ResetDictionaries'
  constructor() {}
}
