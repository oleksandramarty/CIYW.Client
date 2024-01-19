import {ITableEditableColumns, TableEditableColumns} from "./table-editable-columns";
import {ITableItemHelper, TableItemHelper} from "./table-item-helper";
import {IInvoiceResponse} from "../services/api-client";
import {
  InvoiceDialogComponent
} from "../../modules/areas/personal-area/dialogs/invoice-dialog/invoice-dialog.component";
import {IListWithIncludeHelper} from "../models/common.model";
import {IInvoiceType} from "../models/invoice.model";
import {CIYWTableDialogEnum, CIYWTableEnum} from "../enums/ciyw-table.enum";
import {IDisplayedCIYWTableColumn, IDisplayedCIYWTableSchema} from "./ciyw-table";
import {ComponentType} from "@angular/cdk/overlay";

export interface ITableInvoiceColumns extends ITableEditableColumns{
  date: ITableItemHelper | undefined;
  humanize_date: ITableItemHelper | undefined;
  category: ITableItemHelper | undefined;
  name: ITableItemHelper | undefined;
  amount: ITableItemHelper | undefined;
}

export class TableInvoiceColumns extends TableEditableColumns implements ITableInvoiceColumns {
  date: TableItemHelper | undefined;
  humanize_date: TableItemHelper | undefined;
  category: TableItemHelper | undefined;
  name: TableItemHelper | undefined;
  amount: TableItemHelper | undefined;

  constructor(
    date?: TableItemHelper | undefined,
    humanize_date?: TableItemHelper | undefined,
    category?: TableItemHelper | undefined,
    name?: TableItemHelper | undefined,
    amount?: TableItemHelper | undefined,
    editVal?: TableItemHelper | undefined,
    deleteVal?: TableItemHelper | undefined
) {
  super(editVal, deleteVal);
  this.date = date;
  this.humanize_date = humanize_date;
  this.category = category;
  this.name = name;
  this.amount = amount;
}

  public static MapApi(invoices: IInvoiceResponse[] | undefined): TableInvoiceColumns[] {
    return !!invoices ? invoices!.map(item => {
      const temp = {
        date: TableItemHelper.CreateTableDateItem(item.date),
        humanize_date: TableItemHelper.CreateTableDefaultItem(''),
        category: TableItemHelper.CreateTableDefaultItem(item.category?.name),
        amount: TableItemHelper.CreateTableCurrencyItem(item.amount, { currency: item.currency?.isoCode}),
        name: TableItemHelper.CreateTableDefaultItem(item.name),
        edit: TableItemHelper.CreateTableIconItem(item.id, 'edit', InvoiceDialogComponent),
        delete: TableItemHelper.CreateTableIconItem(item.id, 'delete', null),
      } as TableInvoiceColumns;
      return temp;
    }) : [];
  }

  public static Map(invoices: IListWithIncludeHelper<IInvoiceType> | undefined): TableInvoiceColumns[] {
    return !!invoices?.entities ? invoices!.entities.map(item => {
      const temp = {
        date: TableItemHelper.CreateTableDateItem(item.date, {format: 'yyyy-MM-dd'}, `<div class="opacity-05 f-075">(${item.modified})</div>`),
        humanize_date: TableItemHelper.CreateTableDefaultItem(item.humanize_date),
        category: TableItemHelper.CreateTableDefaultItem(item.category?.name),
        amount: TableItemHelper.CreateTableCurrencyItem(item.amount, { currency: item.currency?.isoCode}),
        name: TableItemHelper.CreateTableDefaultItem(item.name),
        edit: TableItemHelper.CreateTableIconItem(item.id, 'edit', InvoiceDialogComponent),
        delete: TableItemHelper.CreateTableIconItem(item.id, 'delete', null),
      } as TableInvoiceColumns;
      return temp;
    }) : [];
  }
}
