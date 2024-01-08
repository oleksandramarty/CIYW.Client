import {IAnyHelper, IStyleHelper} from "./common.model";

export interface IDisplayedCIYWTableSchema {
  displayedColumns: string[] | undefined;
  items: IDisplayedCIYWTableColumn[] | undefined;
}

export interface IDisplayedCIYWTableColumn {
  title: string | undefined;
  isSortable: boolean | undefined;
  value: string;
  style?: IStyleHelper | undefined;
}
