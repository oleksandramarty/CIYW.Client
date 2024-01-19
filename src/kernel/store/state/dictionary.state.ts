import {Action, Selector, State, StateContext} from "@ngxs/store";
import {
  IDictionariesResponse,
  IGuidDictionaryResponse,
  IStringDictionaryItemResponse,
  IStringDictionaryResponse
} from "../../services/api-client";
import {Injectable} from "@angular/core";
import {Dictionaries} from "../../models/dictionary.model";
import {ResetDictionaries, SetDictionaries} from "../actions/dictionary.actions";

const defaults = {
  currencies: { items: [] },
  categories: { items: [] },
  roles: { items: [] },
  tariffs: { items: [] },
  invoiceTypes: { items: [] },
};

@State<Dictionaries>({
  name: 'dictionary',
  defaults,
})
@Injectable()
export class DictionariesState {
  @Selector()
  static getDictionaries(data: Dictionaries): IDictionariesResponse { return data as IDictionariesResponse; }
  @Selector()
  static getCurrencies(data: Dictionaries): IGuidDictionaryResponse { return data.currencies as IGuidDictionaryResponse; }
  @Selector()
  static getCategories(data: Dictionaries): IGuidDictionaryResponse { return data.categories as IGuidDictionaryResponse; }
  @Selector()
  static getTariffs(data: Dictionaries): IGuidDictionaryResponse { return data.tariffs as IGuidDictionaryResponse; }
  @Selector()
  static getRoles(data: Dictionaries): IGuidDictionaryResponse { return data.roles as IGuidDictionaryResponse; }
  @Selector()
  static getInvoiceTypes(data: Dictionaries): IStringDictionaryResponse { return data.roles as IStringDictionaryResponse; }

  @Action(SetDictionaries)
  SetDictionaries({patchState}: StateContext<Dictionaries>, {data}: any) {
    patchState({
      currencies: data.currencies as IGuidDictionaryResponse,
      categories: data.categories as IGuidDictionaryResponse,
      roles: data.roles as IGuidDictionaryResponse,
      tariffs: data.tariffs as IGuidDictionaryResponse,
      invoiceTypes: data.invoiceTypes as IStringDictionaryResponse,
    });
  }

  @Action(ResetDictionaries)
  ResetUser({setState}: StateContext<Dictionaries>) {
    setState(defaults);
  }
}
