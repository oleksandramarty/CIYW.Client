import {IAnyHelper, IStyleHelper} from "../models/common.model";
import {CIYWTableDialogEnum, CIYWTableEnum} from "../enums/ciyw-table.enum";
import {ComponentType} from "@angular/cdk/overlay";
import {TableInvoiceColumns} from "./table-invoice-columns";
import {UserDialogComponent} from "../../modules/areas/admin-area/dialogs/user-dialog/user-dialog.component";
import {TableUserColumns} from "./table-user-columns";
import {
  InvoiceDialogComponent
} from "../../modules/areas/personal-area/dialogs/invoice-dialog/invoice-dialog.component";

export interface IDisplayedCIYWTableSchema {
  displayedColumns: string[] | undefined;
  items: IDisplayedCIYWTableColumn[] | undefined;
  addButtonText?: string | undefined;
  addButtonClassName?: ComponentType<any> | null;
}

export interface IDisplayedCIYWTableColumn {
  title: string | undefined;
  isSortable: boolean | undefined;
  value: string;
  style?: IStyleHelper | undefined;
  dialogType?: CIYWTableDialogEnum | undefined;
  parentClass?: string | undefined;
}
