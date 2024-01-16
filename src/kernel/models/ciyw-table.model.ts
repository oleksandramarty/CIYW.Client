import {IAnyHelper, IStyleHelper} from "./common.model";
import {CIYWTableDialogEnum} from "../enums/ciyw-table.enum";
import {ComponentType} from "@angular/cdk/overlay";

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
