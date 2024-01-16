import {Component, OnDestroy, OnInit} from '@angular/core';
import {finalize, Observable, Subject, Subscription, takeUntil, tap} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {
  ApiClient, Paginator, BaseSortableQuery,
  IPaginator, IBaseSortableQuery,
  ICurrentUserResponse, UserInvoicesQuery, IBalanceInvoiceResponse
} from "../../../kernel/services/api-client";
import {MatSnackBar} from "@angular/material/snack-bar";
import {handleApiError} from "../../../kernel/helpers/rxjs.helper";
import {UserState} from "../../../kernel/store/state/user.state";
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder} from "@angular/forms";
import {ITableFilterHelper, mapGraphInvoiceTable, mapInvoiceTable} from "../../../kernel/mappers/ciyw-table.mapper";
import {GraphQLService} from "../../../kernel/graph-ql/graph-ql.service";
import {IUserBalance} from "../../../kernel/models/user.model";
import {IListWithIncludeHelper} from "../../../kernel/models/common.model";
import {IInvoiceType} from "../../../kernel/models/invoice.model";
import {CIYWTableEnum} from "../../../kernel/enums/ciyw-table.enum";

@Component({
  selector: 'ciyw-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  @Select(UserState.getUser) user$: Observable<ICurrentUserResponse> | undefined;
  @Select(UserState.getBalance) balance$: Observable<IUserBalance> | undefined;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  subs = new Subscription();

  dataSource: MatTableDataSource<any> | undefined;

  tableType = CIYWTableEnum;

  user: ICurrentUserResponse | undefined;
  balance: IUserBalance | undefined;
  invoices: IListWithIncludeHelper<IInvoiceType> | undefined;

  graphQLInvoices: IListWithIncludeHelper<IInvoiceType> | undefined;

  paginator: IPaginator | undefined;
  sort: IBaseSortableQuery | undefined;

  isBusy: boolean | undefined = true;

  constructor(
    private fb: FormBuilder,
    private readonly store: Store,
    private readonly apiClient: ApiClient,
    private readonly snackBar: MatSnackBar,
    private graphQlService: GraphQLService,
  ) {}

  ngOnInit() {
    if (!!this.user$) {
      this.subs.add(this.user$.subscribe((user) => {
        this.user = user;
        this.graphQlService.getUserBalance(this.user.id!);
      }));
    }
    if (!!this.balance$) {
      this.subs.add(this.balance$.subscribe((balance) => this.balance = balance ));
    }
    this.paginator = {
      isFull: false,
      pageNumber: 1,
      pageSize: 10,
    };

    this.sort = { column: 'Date', direction: 'desc'};

    this.getInvoices();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public filterChanged(event: ITableFilterHelper): void {
    this.sort = event.sort;
    this.paginator = event.paginator;
    this.getInvoices();
  }

  private getInvoices(): void {
    // this.getApiInvoices();
    this.getGraphQLInvoices();
    this.graphQlService.getUserBalance(this.user!.id!);
  }

  private getApiInvoices(): void {
    this.isBusy = true;
    this.dataSource = new MatTableDataSource<any>([]);
    this.apiClient.invoices_V1_GetUserInvoicesPOST({
      paginator: this.paginator as Paginator,
      sort: this.sort as BaseSortableQuery
    } as UserInvoicesQuery)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        tap((result) => {
          this.invoices = result as IListWithIncludeHelper<IInvoiceType>;
          if (!this.dataSource) {
            this.dataSource = new MatTableDataSource<any>([]);
          }
          this.dataSource!.data = mapGraphInvoiceTable(this.invoices);
        }),
        handleApiError(this.snackBar),
        finalize(() => this.isBusy = false)
      ).subscribe();
  }

  private getGraphQLInvoices(): void {
    this.isBusy = true;
    this.dataSource = new MatTableDataSource<any>([]);
    this.graphQlService.getUserInvoices(this.paginator, this.sort)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        tap((result) => {
          this.graphQLInvoices = result?.data?.invoices;
          if (!this.dataSource) {
            this.dataSource = new MatTableDataSource<any>([]);
          }
          this.dataSource!.data = mapGraphInvoiceTable(this.graphQLInvoices);
          this.isBusy = false;
        }),
        handleApiError(this.snackBar),
      ).subscribe();
  }
}
