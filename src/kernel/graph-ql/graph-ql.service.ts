
import { Injectable } from '@angular/core';
import {Apollo, QueryRef} from "apollo-angular";
import {ApolloQueryResult, gql} from "@apollo/client/core"
import {Store} from "@ngxs/store";
import {SetUserBalance} from "../store/actions/user.actions";
import {BaseSortableQuery, IBaseSortableQuery, IPaginator, Paginator} from "../services/api-client";
import {finalize, Observable, takeUntil, tap} from "rxjs";
import {EmptyObject} from "apollo-angular/types";
import {IListWithIncludeHelper} from "../models/common.model";
import {IInvoiceType} from "../models/invoice.model";
import {MatTableDataSource} from "@angular/material/table";
import {mapGraphInvoiceTable} from "../mappers/table.mapper";
import {handleApiError} from "../helpers/rxjs.helper";

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
        query: gql`
          {
            userBalance (userId: "${userId}") {
              amount,
              currency {
                isoCode,
                symbol
              }
            }
          }
        `,})
      .valueChanges.subscribe((result: any) => {
        this.store.dispatch(new SetUserBalance({
          amount: result?.data?.userBalance?.amount,
          isoCode: result?.data?.userBalance?.currency?.isoCode,
          symbol: result?.data?.userBalance?.currency?.symbol
        }));
    });
  }

  public getUserInvoices(
    paginator: IPaginator | undefined,
    sort: IBaseSortableQuery | undefined): void {
    this.apollo
      .watchQuery({
        query: gql`
            invoices(
              isFull: ${paginator?.isFull ?? false},
              pageNumber: ${paginator?.pageNumber ?? 1},
              pageSize: ${paginator?.pageSize ?? 5},
              dateFrom: ${null},
              dateTo: ${null},
              column: ${sort?.column ?? 'Created'},
              direction: ${sort?.direction ?? 'desc'}
            ) {
              entities {
                date,
                humanize_date,
                id,
                name,
                category {
                  name
                }
              }
              paginator {
                pageNumber,
                pageSize
              }
              totalCount
            }
          }
        `}).valueChanges
      .pipe(
        tap((result) => {
          console.log(result)
        }),
      ).subscribe();
  }
}
