import {Component, OnDestroy, OnInit} from '@angular/core';
import {finalize, Observable, Subject, Subscription, takeUntil, tap} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {
  ApiClient, BasePageableQuery, BaseSortableQuery,
  IBalanceInvoicePageableResponse, IBasePageableQuery, IBaseSortableQuery,
  ICurrentUserResponse, UserInvoicesQuery
} from "../../../kernel/services/api-client";
import {MatSnackBar} from "@angular/material/snack-bar";
import {handleApiError} from "../../../kernel/helpers/rxjs.helper";
import {UserState} from "../../../kernel/store/state/user.state";
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder} from "@angular/forms";
import {ITableFilterHelper, mapInvoiceTable} from "../../../kernel/mappers/table.mapper";

@Component({
  selector: 'ciyw-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  @Select(UserState.getUser) user$: Observable<ICurrentUserResponse> | undefined;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  subs = new Subscription();

  displayedColumns: string[] = ['date', 'category', 'name', 'amount'];
  dataSource: MatTableDataSource<any> | undefined;

  user: ICurrentUserResponse | undefined;
  balance: IBalanceInvoicePageableResponse | undefined;

  paginator: IBasePageableQuery | undefined;
  sort: IBaseSortableQuery | undefined;

  isBusy: boolean | undefined = true;

  constructor(
    private fb: FormBuilder,
    private readonly store: Store,
    private readonly apiClient: ApiClient,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if (!!this.user$) {
      this.subs.add(this.user$.subscribe((user) => this.user = user));
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
    this.isBusy = true;
    this.apiClient.invoices_v1_history({
      paginator: this.paginator as BasePageableQuery,
      sort: this.sort as BaseSortableQuery
    } as UserInvoicesQuery)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        tap((result) => {
          this.balance = result;
          if (!this.dataSource) {
            this.dataSource = new MatTableDataSource<any>([]);
          }
          this.dataSource!.data = mapInvoiceTable(this.balance!.invoices);
        }),
        handleApiError(this.snackBar),
        finalize(() => this.isBusy = false)
      ).subscribe();
  }
}


