import {IBaseDateEntityType, IBaseEntityType, IBaseModifiedEntityType} from "./common.model";

export interface ICurrencyType extends IBaseEntityType {
  isoCode?: string | undefined;
  symbol?: string | undefined;
  name?: string | undefined;
  isActive?: boolean | undefined;
}
