import {IPaginator} from "../services/api-client";

export interface IListWithIncludeHelper<T> {
  entities: T[];
  paginator: IPaginator;
  totalCount: number;
}

export interface IBaseEntityType {
  id?: string | undefined;
}

export interface IBaseModifiedEntityType {
  created?: Date | undefined;
  updated?: Date | undefined;
  modified?: string | undefined;
}

export interface IBaseDateEntityType {
  date?: Date | undefined;
  humanize_date?: string | undefined;
}
