import {ICategoryType} from "./category.model";
import {ICurrencyType} from "./currency.model";
import {IBaseDateEntityType, IBaseEntityType, IBaseModifiedEntityType} from "./common.model";

export interface IInvoiceType extends IBaseEntityType, IBaseModifiedEntityType, IBaseDateEntityType{
  name?: string | undefined;
  amount?: number | undefined;
  userId?: string | undefined;
  // user?: User;
  categoryId?: string | undefined;
  category?: ICategoryType | undefined;
  currencyId?: string | undefined;
  currency?: ICurrencyType | undefined;
  noteId?: string | undefined;
  // note?: Note;
  // type?: InvoiceTypeEnum;
}
