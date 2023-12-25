import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, Subscription, takeUntil, tap} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {
  ApiClient, BalanceInvoiceResponse, BasePageableQuery, BaseSortableQuery,
  IBalanceInvoicePageableResponse, IBasePageableQuery, IBaseSortableQuery,
  ICurrentUserResponse, UserInvoicesQuery
} from "../../../kernel/services/api-client";
import {MatSnackBar} from "@angular/material/snack-bar";
import {handleApiError} from "../../../kernel/helpers/rxjs.helper";
import {UserState} from "../../../kernel/store/state/user.state";
import {MatTableDataSource} from "@angular/material/table";
import {Sort} from "@angular/material/sort";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'ciyw-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  @Select(UserState.getUser) user$: Observable<ICurrentUserResponse> | undefined;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  subs = new Subscription();

  displayedColumns: string[] = ['Date', 'CategoryId', 'Name', 'Amount'];
  dataSource: MatTableDataSource<BalanceInvoiceResponse> | undefined;

  user: ICurrentUserResponse | undefined;
  balance: IBalanceInvoicePageableResponse | undefined;

  paginator: IBasePageableQuery | undefined;
  sort: IBaseSortableQuery | undefined;

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

  private getInvoices(): void {
    this.apiClient.invoices_v1_history({
      paginator: this.paginator as BasePageableQuery,
      sort: this.sort as BaseSortableQuery
    } as UserInvoicesQuery)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        tap((result) => {
          this.balance = result;
          this.dataSource = new MatTableDataSource(this.balance?.invoices);
        }),
        handleApiError(this.snackBar)
      ).subscribe();
  }
}
