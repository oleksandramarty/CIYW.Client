import {BaseSortableQuery, IBaseSortableQuery, IPaginator, Paginator} from "../services/api-client";

export interface ITableFilterHelper {
  paginator: IPaginator | undefined,
  sort: IBaseSortableQuery | undefined
}

export class TableFilterHelper implements ITableFilterHelper {
  paginator: Paginator | undefined;
  sort: BaseSortableQuery | undefined;

  constructor(paginator?: Paginator, sort?: BaseSortableQuery) {
    this.paginator = paginator;
    this.sort = sort;
  }
}
