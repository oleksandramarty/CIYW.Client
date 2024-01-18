import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {UserState} from "../../../../kernel/store/state/user.state";
import {Observable, Subject, Subscription, switchMap, takeUntil, tap} from "rxjs";
import {HomeRedirect, ResetUser, SetToken, SetUser} from "../../../../kernel/store/actions/user.actions";
import {ApiClient, AuthLoginQuery, IDictionariesResponse} from "../../../../kernel/services/api-client";
import {handleApiError} from "../../../../kernel/helpers/rxjs.helper";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SetDictionaries} from "../../../../kernel/store/actions/dictionary.actions";

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
          this.store.dispatch(new HomeRedirect());
          return this.apiClient.dictionaries_V1_GetAll();
        }),
        tap((dictionaries) => {
          this.store.dispatch(new SetDictionaries(dictionaries as IDictionariesResponse));
        }),
        handleApiError(this.snackBar)
      ).subscribe();
  }
}
