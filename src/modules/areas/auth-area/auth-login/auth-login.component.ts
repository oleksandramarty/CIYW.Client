import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {
  ApiClient,
  AuthLoginQuery,
  IUserResponse,
  ITokenResponse,
  IActiveUserResponse, FormTypeEnum
} from "../../../../kernel/services/api-client";
import {catchError, Subject, switchMap, take, takeUntil, tap, throwError} from "rxjs";
import {handleApiError} from "../../../../kernel/helpers/rxjs.helper";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Store} from "@ngxs/store";
import {HomeRedirect, SetActive, SetToken, SetUser} from "../../../../kernel/store/actions/user.actions";
import {SignalRService} from "../../../../kernel/services/signalR.service";

@Component({
  selector: 'ciyw-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss'
})
export class AuthLoginComponent implements OnDestroy {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  public formType = FormTypeEnum;

  constructor(
    private readonly store: Store,
    private readonly apiClient: ApiClient,
    private readonly snackBar: MatSnackBar,
  ) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  auth(event: FormGroup) {
    this.apiClient.auth_V1_Login({...event?.value
    } as AuthLoginQuery)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        switchMap((result) => {
          this.store.dispatch(new SetToken(result as ITokenResponse));
          return this.apiClient.users_V1_CurrentUser();
        }),
        switchMap((result) => {
          this.store.dispatch(new SetUser(result as IUserResponse));
          return this.apiClient.users_V1_ActiveUser();
        }),
        tap((result) => {
          this.store.dispatch(new SetActive(result as IActiveUserResponse));
          this.store.dispatch(new HomeRedirect());
        }),
        handleApiError(this.snackBar)
      ).subscribe();
  }
}
