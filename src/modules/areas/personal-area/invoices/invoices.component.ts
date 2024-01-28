import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {UserState} from "../../../../kernel/store/state/user.state";
import {Observable, Subject, Subscription, takeUntil, tap} from "rxjs";
import {ApiClient, IBaseSortableQuery, IPaginator, IUserResponse} from "../../../../kernel/services/api-client";
import {IUserBalance} from "../../../../kernel/models/user.model";
import {MatTableDataSource} from "@angular/material/table";
import {CIYWTableEnum} from "../../../../kernel/enums/ciyw-table.enum";
import {IListWithIncludeHelper} from "../../../../kernel/models/common.model";
import {IInvoiceType} from "../../../../kernel/models/invoice.model";
import {FormBuilder} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {GraphQLService} from "../../../../kernel/graph-ql/graph-ql.service";
import {TableFilterHelper} from "../../../../kernel/mappers/table-filter-helper";
import {TableInvoiceColumns} from "../../../../kernel/mappers/table-invoice-columns";
import {handleApiError} from "../../../../kernel/helpers/rxjs.helper";

@Component({
  selector: 'ciyw-invoices',
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss'
})
export class InvoicesComponent implements OnInit, OnDestroy {
  @Select(UserState.getUser) user$: Observable<IUserResponse> | undefined;
  @Select(UserState.getBalance) balance$: Observable<IUserBalance> | undefined;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  subs = new Subscription();

  dataSource: MatTableDataSource<any> | undefined;

  tableType = CIYWTableEnum;

  user: IUserResponse | undefined;
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

  public filterChanged(event: TableFilterHelper): void {
    this.sort = event.sort;
    this.paginator = event.paginator;
    this.getInvoices();
  }

  private getInvoices(): void {
    this.getGraphQLInvoices();
    this.graphQlService.getUserBalance(this.user!.id!);
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
          this.dataSource!.data = TableInvoiceColumns.Map(this.graphQLInvoices);
          this.isBusy = false;
        }),
        handleApiError(this.snackBar),
      ).subscribe();
  }
}
