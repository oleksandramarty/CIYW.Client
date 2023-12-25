import {VariableTypeEnum} from "../enums/variable-type.enum";
import {IBalanceInvoiceResponse, IBasePageableQuery, IBaseSortableQuery} from "../services/api-client";
import {createTableCurrencyItem, createTableDateItem, createTableDefaultItem} from "../helpers/table.helper";

export interface ITableFilterHelper {
  paginator: IBasePageableQuery | undefined,
  sort: IBaseSortableQuery | undefined
}

export interface ITableInvoiceColumns {
  date: ITableItemHelper | undefined;
  category: ITableItemHelper | undefined;
  name: ITableItemHelper | undefined;
  amount: ITableItemHelper | undefined;
}

export interface ITableItemHelper {
  type: VariableTypeEnum,
  value: Date | number | string | boolean | undefined,
  pipeParams: {
    [key: string]: Date | number | string | boolean | undefined
  } | null;
}

export function mapInvoiceTable(invoices: IBalanceInvoiceResponse[] | undefined): ITableInvoiceColumns[] {
  return !!invoices ? invoices!.map(item => {
    const temp: ITableInvoiceColumns = {
      date: createTableDateItem(item.date),
      category: createTableDefaultItem(item.category?.name),
      amount: createTableCurrencyItem(item.amount, { currency: item.currency?.isoCode}),
      name: createTableDefaultItem(item.name)
    };
    return temp;
  }) : [];
}
