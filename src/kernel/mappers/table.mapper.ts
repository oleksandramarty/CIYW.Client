import {VariableTypeEnum} from "../enums/variable-type.enum";
import {IBalanceInvoiceResponse, IPaginator, IBaseSortableQuery} from "../services/api-client";
import {
  createTableCurrencyItem,
  createTableDateItem,
  createTableDefaultItem,
  createTableIconItem
} from "../helpers/table.helper";
import {InvoiceDialogComponent} from "../../modules/personal-area/invoice-dialog/invoice-dialog.component";
import {ComponentType} from "@angular/cdk/overlay";
import {ICiywConfirmDialogData} from "../models/dialog-input-data.model";
import {IListWithIncludeHelper} from "../models/common.model";
import {IInvoiceType} from "../models/invoice.model";

export interface ITableFilterHelper {
  paginator: IPaginator | undefined,
  sort: IBaseSortableQuery | undefined
}

export interface ITableInvoiceColumns extends ITableEditableColumns{
  date: ITableItemHelper | undefined;
  humanize_date: ITableItemHelper | undefined;
  category: ITableItemHelper | undefined;
  name: ITableItemHelper | undefined;
  amount: ITableItemHelper | undefined;
}


export interface ITableEditableColumns {
  edit: ITableItemHelper | undefined;
  delete: ITableItemHelper | undefined;
}

export interface ITableItemHelper {
  type: VariableTypeEnum,
  value: Date | number | string | boolean | undefined,
  icon: string | null,
  className: ComponentType<any> | null,
  pipeParams: {
    [key: string]: Date | number | string | boolean | undefined
  } | null;
}

export function mapInvoiceTable(invoices: IBalanceInvoiceResponse[] | undefined): ITableInvoiceColumns[] {
  return !!invoices ? invoices!.map(item => {
    const temp: ITableInvoiceColumns = {
      date: createTableDateItem(item.date),
      humanize_date: createTableDefaultItem(''),
      category: createTableDefaultItem(item.category?.name),
      amount: createTableCurrencyItem(item.amount, { currency: item.currency?.isoCode}),
      name: createTableDefaultItem(item.name),
      edit: createTableIconItem(item.id, 'edit', InvoiceDialogComponent),
      delete: createTableIconItem(item.id, 'delete', null),
    };
    return temp;
  }) : [];
}
export function mapGraphInvoiceTable(invoices: IListWithIncludeHelper<IInvoiceType> | undefined): ITableInvoiceColumns[] {
  return !!invoices?.entities ? invoices!.entities.map(item => {
    const temp: ITableInvoiceColumns = {
      date: createTableDateItem(item.date),
      humanize_date: createTableDefaultItem(item.humanize_date),
      category: createTableDefaultItem(item.category?.name),
      amount: createTableCurrencyItem(item.amount, { currency: item.currency?.isoCode}),
      name: createTableDefaultItem(item.name),
      edit: createTableIconItem(item.id, 'edit', InvoiceDialogComponent),
      delete: createTableIconItem(item.id, 'delete', null),
    };
    return temp;
  }) : [];
}
