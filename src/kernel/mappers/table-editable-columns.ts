import {ITableItemHelper, TableItemHelper} from "./table-item-helper";

export interface ITableEditableColumns {
  edit: ITableItemHelper | undefined;
  delete: ITableItemHelper | undefined;
}

export class TableEditableColumns implements ITableEditableColumns {
  edit: TableItemHelper | undefined;
  delete: TableItemHelper | undefined;

  constructor(editVal: TableItemHelper | undefined, deleteVal: TableItemHelper | undefined) {
    this.edit = editVal;
    this.delete = deleteVal;
  }
}
