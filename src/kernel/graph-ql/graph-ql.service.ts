import { Injectable } from '@angular/core';
import {Apollo} from "apollo-angular";
import {Store} from "@ngxs/store";
import {SetUserBalance} from "../store/actions/user.actions";
import {IBaseSortableQuery, IPaginator} from "../services/api-client";
import {Observable, tap} from "rxjs";
import {USER_BALANCE_QUERY, USER_INVOICES_QUERY} from "./graph-ql.query";
import {ApolloQueryResult} from "@apollo/client";
import {IListWithIncludeHelper} from "../models/common.model";
import {IInvoiceType} from "../models/invoice.model";

@Injectable({
  providedIn: 'root',
})
export class GraphQLService {
  constructor(
    private apollo: Apollo,
    private store: Store) {
  }

  public getUserBalance(userId: string | null): void {
    this.apollo
      .watchQuery({
        query: USER_BALANCE_QUERY,
        variables: { userId },
      }).valueChanges.subscribe((result: any) => {
        this.store.dispatch(new SetUserBalance({
          amount: result?.data?.userBalance?.amount,
          isoCode: result?.data?.userBalance?.currency?.isoCode,
          symbol: result?.data?.userBalance?.currency?.symbol
        }));
    });
  }

  public getUserInvoices(
    paginator: IPaginator | undefined,
    sort: IBaseSortableQuery | undefined): Observable<ApolloQueryResult<{ invoices: IListWithIncludeHelper<IInvoiceType> | undefined }>> {
      return this.apollo
        .watchQuery({
          query: USER_INVOICES_QUERY,
          variables: {
            isFull: paginator?.isFull ?? false,
            pageNumber: paginator?.pageNumber ?? 1,
            pageSize: paginator?.pageSize ?? 5,
            dateFrom: null,
            dateTo: null,
            column: `${sort?.column ?? 'Created'}`,
            direction: `${sort?.direction ?? 'desc'}`
          },
        }).valueChanges as Observable<ApolloQueryResult<{ invoices: IListWithIncludeHelper<IInvoiceType> | undefined }>>;
  }
}



