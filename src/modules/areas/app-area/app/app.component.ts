import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, Subscription, switchMap, takeUntil, tap} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {UserState} from "../../../../kernel/store/state/user.state";
import {ApiClient, IActiveUserResponse, IDictionariesResponse} from "../../../../kernel/services/api-client";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HomeRedirect, ResetUser, SetActive, SetAvatar, SetUser} from "../../../../kernel/store/actions/user.actions";
import {SetDictionaries} from "../../../../kernel/store/actions/dictionary.actions";
import {handleApiError} from "../../../../kernel/helpers/rxjs.helper";
import {SignalRService} from "../../../../kernel/services/signalR.service";

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
    private readonly signalR: SignalRService,
  ) {
  }

  ngOnInit() {
    if (!!this.isAuthorized$) {
      this.subs.add(this.isAuthorized$.subscribe((isAuthorized) => {
        if (!isAuthorized) {
          this.store.dispatch(new ResetUser());
        } else {
          this.signalR.start();
          this.getUserData();
        }
      }));
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private getUserData(): void {
    this.apiClient.users_V1_CurrentUser()
      .pipe(
        takeUntil(this.ngUnsubscribe),
        switchMap((result) => {
          this.store.dispatch(new SetUser(result));
          return this.apiClient.dictionaries_V1_GetAll();
        }),
        switchMap((dictionaries) => {
          this.store.dispatch(new SetDictionaries(dictionaries as IDictionariesResponse));
          return this.apiClient.users_V1_GetCurrentUserImage();
        }),
        switchMap((result) => {
          this.store.dispatch(new SetAvatar(result?.data));
          return this.apiClient.users_V1_ActiveUser();
        }),
        tap((result) => {
          this.store.dispatch(new SetActive(result as IActiveUserResponse));
        }),
        handleApiError(this.snackBar)
      ).subscribe();
  }
}
