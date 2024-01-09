import {Action, Selector, State, StateContext} from "@ngxs/store";
import { IDictionaryResponse, IDictionariesResponse } from "../../services/api-client";
import {Injectable} from "@angular/core";
import {Dictionaries} from "../../models/dictionary.model";
import {ResetDictionaries, SetDictionaries} from "../actions/dictionary.actions";

const defaults = {
  currencies: { items: [] },
  categories: { items: [] },
  roles: { items: [] },
  tariffs: { items: [] },
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
  static getCurrencies(data: Dictionaries): IDictionaryResponse { return data.currencies as IDictionaryResponse; }
  @Selector()
  static getCategories(data: Dictionaries): IDictionaryResponse { return data.categories as IDictionaryResponse; }
  @Selector()
  static getTariffs(data: Dictionaries): IDictionaryResponse { return data.tariffs as IDictionaryResponse; }
  @Selector()
  static getRoles(data: Dictionaries): IDictionaryResponse { return data.roles as IDictionaryResponse; }

  @Action(SetDictionaries)
  SetUser({patchState}: StateContext<Dictionaries>, {data}: any) {
    patchState({
      currencies: data.currencies as IDictionaryResponse,
      categories: data.categories as IDictionaryResponse,
      roles: data.roles as IDictionaryResponse,
      tariffs: data.tariffs as IDictionaryResponse,
    });
  }

  @Action(ResetDictionaries)
  ResetUser({setState}: StateContext<Dictionaries>) {
    setState(defaults);
  }
}
