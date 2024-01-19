import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, Subscription, switchMap, takeUntil, tap} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {UserState} from "../../../../kernel/store/state/user.state";
import {ApiClient, IDictionariesResponse} from "../../../../kernel/services/api-client";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HomeRedirect, ResetUser, SetAvatar, SetUser} from "../../../../kernel/store/actions/user.actions";
import {SetDictionaries} from "../../../../kernel/store/actions/dictionary.actions";
import {handleApiError} from "../../../../kernel/helpers/rxjs.helper";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy{
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

    this.getUserData();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getUserData(): void {
    this.apiClient.users_V1_CurrentUser()
      .pipe(
        takeUntil(this.ngUnsubscribe),
        switchMap((result) => {
          this.store.dispatch(new SetUser(result));
          return this.apiClient.dictionaries_V1_GetAll();
        }),
        tap((dictionaries) => {
          this.store.dispatch(new SetDictionaries(dictionaries as IDictionariesResponse));
        }),
        switchMap(() => {
          return this.apiClient.users_V1_GetCurrentUserImage();
        }),
        tap((result) => {
          this.store.dispatch(new SetAvatar(result?.data));
        }),
        handleApiError(this.snackBar)
      ).subscribe();
  }
}
