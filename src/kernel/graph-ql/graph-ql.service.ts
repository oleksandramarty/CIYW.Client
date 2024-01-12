import { Injectable } from '@angular/core';
import {Apollo} from "apollo-angular";
import {Store} from "@ngxs/store";
import {SetUserBalance} from "../store/actions/user.actions";
import {IBalanceInvoiceResponse, IBaseSortableQuery, IPaginator} from "../services/api-client";
import {Observable, tap} from "rxjs";
import {USER_BALANCE_QUERY, USER_INVOICE_QUERY, USER_INVOICES_QUERY, CREATE_USER_INVOICE} from "./graph-ql.query";
import {ApolloQueryResult} from "@apollo/client";
import {IListWithIncludeHelper} from "../models/common.model";
import {IInvoiceType} from "../models/invoice.model";
import type {MutationResult} from "apollo-angular/types";

@Injectable({
  providedIn: 'root',
})
export class GraphQLService {
  constructor(
    private apollo: Apollo,
    private store: Store) {
  }

  public createInvoice(
    name: string,
    amount: number,
    categoryId: string,
    currencyId: string,
    date: string,
    type: string,
    noteName: string,
    noteBody: string
  ): Observable<MutationResult<IBalanceInvoiceResponse | undefined>> {
    return this.apollo
      .mutate({
        mutation: CREATE_USER_INVOICE,
        variables: {
          input: {
            name,
            amount,
            categoryId,
            currencyId,
            date,
            type,
            note: !noteName && !noteBody ? null : {
              name: noteName,
              body: noteBody,
            },
          },
        },
      });
  }

  public getUserInvoice(id: string | null): Observable<ApolloQueryResult<{ invoice: IBalanceInvoiceResponse | undefined }>> {
    return this.apollo
      .watchQuery({
        query: USER_INVOICE_QUERY,
        variables: {
          id: id!,
        },
        fetchPolicy: 'network-only',
      }).valueChanges as Observable<ApolloQueryResult<{ invoice: IBalanceInvoiceResponse | undefined }>>;
  }

  public getUserBalance(userId: string | null): void {
    this.apollo
      .watchQuery({
        query: USER_BALANCE_QUERY,
        variables: { userId },
        fetchPolicy: 'network-only'
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
    let sortColumn = sort?.column ?? 'Created';
      return this.apollo
        .watchQuery({
          query: USER_INVOICES_QUERY,
          variables: {
            isFull: paginator?.isFull ?? false,
            pageNumber: paginator?.pageNumber ?? 1,
            pageSize: paginator?.pageSize ?? 5,
            dateFrom: null,
            dateTo: null,
            column: `${sortColumn === 'Date' ? 'Created' : sortColumn}`,
            direction: `${sort?.direction ?? 'desc'}`
          },
          fetchPolicy: 'network-only',
        }).valueChanges as Observable<ApolloQueryResult<{ invoices: IListWithIncludeHelper<IInvoiceType> | undefined }>>;
  }
}



