import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select} from "@ngxs/store";
import {Observable, Subject, Subscription, takeUntil, tap} from "rxjs";
import {
  ApiClient, BaseSortableQuery,
  ITariffResponseListWithIncludeHelper,
  IUserResponse,
  Paginator,
  TariffsQuery
} from "../../../../kernel/services/api-client";
import {UserState} from "../../../../kernel/store/state/user.state";
import {handleApiError} from "../../../../kernel/helpers/rxjs.helper";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SortDirection} from "@angular/material/sort";

@Component({
  selector: 'ciyw-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  @Select(UserState.getUser) user$: Observable<IUserResponse> | undefined;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  subs = new Subscription();

  public user: IUserResponse | undefined;

  public tariffs: ITariffResponseListWithIncludeHelper | undefined;

  constructor(
    private readonly apiClient: ApiClient,
    private readonly snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.apiClient.tariffs_V1_GetTariffs({
      sort: {
        column: 'Order',
        direction: 'asc'
      } as BaseSortableQuery,
      paginator: {
        isFull: true,
        pageNumber: 1,
        pageSize: 1
      } as Paginator
    } as TariffsQuery)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        tap((response) => {
          this.tariffs = response as ITariffResponseListWithIncludeHelper;
        }),
        handleApiError(this.snackBar)
      ).subscribe();

    if (!!this.user$) {
      this.subs.add(this.user$.subscribe(user => { this.user = user; }));
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
