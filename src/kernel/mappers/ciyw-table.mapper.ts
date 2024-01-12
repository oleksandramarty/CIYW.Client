import {VariableTypeEnum} from "../enums/variable-type.enum";
import {IBalanceInvoiceResponse, IBaseSortableQuery, IPaginator} from "../services/api-client";
import {
  createTableCurrencyItem,
  createTableDateItem,
  createTableDefaultItem,
  createTableIconItem
} from "../helpers/ciyw-table.helper";
import {InvoiceDialogComponent} from "../../modules/personal-area/invoice-dialog/invoice-dialog.component";
import {ComponentType} from "@angular/cdk/overlay";
import {IListWithIncludeHelper} from "../models/common.model";
import {IInvoiceType} from "../models/invoice.model";
import {CIYWTableDialogEnum, CIYWTableEnum} from "../enums/ciyw-table.enum";
import {IDisplayedCIYWTableColumn, IDisplayedCIYWTableSchema} from "../models/ciyw-table.model";

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
  type: VariableTypeEnum;
  value: Date | number | string | boolean | undefined;
  icon: string | null;
  className?: ComponentType<any> | null;
  pipeParams?: {
    [key: string]: Date | number | string | boolean | undefined;
  } | null;
  htmlContent?: string | undefined | null;
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
      date: createTableDateItem(item.date, {format: 'yyyy-MM-dd'}, `<div class="opacity-05 f-075">(${item.modified})</div>`),
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

export function crateCIYWTableSchema(type: CIYWTableEnum | undefined): IDisplayedCIYWTableSchema {
  if (!type) {
    return {
      displayedColumns: [],
      items: [],
    };
  }

  let items: IDisplayedCIYWTableColumn[] = [];
  let addButtonText: string | null = '';
  let addButtonClassName: ComponentType<any> | null = null;

  switch (type) {
    case CIYWTableEnum.HomeUserInvoices:
      items = [
        { title: 'Date', value: 'date', isSortable: true },
        { title: 'Category', value: 'category', isSortable: true },
        { title: 'Name', value: 'name', isSortable: true },
        { title: 'Amount', value: 'amount', isSortable: true },
      ];
      addButtonText = 'Add invoice';
      addButtonClassName = InvoiceDialogComponent;
      break
  }

  switch (type) {
    case CIYWTableEnum.HomeUserInvoices:
      items.push(
        { title: '', value: 'edit', isSortable: false, style: { width: { attr: 'width', value: 30 }}, dialogType: CIYWTableDialogEnum.EditBtn },
        { title: '', value: 'delete', isSortable: false, style: { width: { attr: 'width', value: 30 }}, dialogType: CIYWTableDialogEnum.DeleteBtn },
      );
      break
  }

  return {
    displayedColumns: items.map(r => r.value),
    items,
    addButtonText,
    addButtonClassName,
  } as IDisplayedCIYWTableSchema;

}
