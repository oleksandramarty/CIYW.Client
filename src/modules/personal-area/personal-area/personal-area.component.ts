import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {UserState} from "../../../kernel/store/state/user.state";
import {Observable, Subject, Subscription, switchMap, takeUntil, tap} from "rxjs";
import {HomeRedirect, ResetUser, SetToken, SetUser} from "../../../kernel/store/actions/user.actions";
import {ApiClient, AuthLoginQuery} from "../../../kernel/services/api-client";
import {handleApiError} from "../../../kernel/helpers/rxjs.helper";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'ciyw-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrl: './personal-area.component.scss'
})
export class PersonalAreaComponent implements OnInit, OnDestroy{
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  @Select(UserState.isAuthorized) isAuthorized$: Observable<boolean> | undefined;

  subs = new Subscription();

  constructor(
    private readonly store: Store,
    private readonly apiClient: ApiClient,
    private readonly snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    if (!!this.isAuthorized$) {
      this.subs.add(this.isAuthorized$.subscribe((isAuthorized) => {
        if (!isAuthorized) {
          this.store.dispatch(new ResetUser());
        }
      }));
    }

    this.getUser();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getUser(): void {
    this.apiClient.users_v1_current()
      .pipe(
        takeUntil(this.ngUnsubscribe),
        tap((result) => {
          this.store.dispatch(new SetUser(result));
          this.store.dispatch(new HomeRedirect());
        }),
        handleApiError(this.snackBar)
      ).subscribe();
  }
}
