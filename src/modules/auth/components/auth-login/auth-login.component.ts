import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {ApiClient, AuthLoginQuery} from "../../../../kernel/services/api-client";
import {catchError, Subject, switchMap, take, takeUntil, tap, throwError} from "rxjs";
import {handleApiError} from "../../../../kernel/helpers/rxjs.helper";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Store} from "@ngxs/store";
import {HomeRedirect, SetToken, SetUser} from "../../../../kernel/store/actions/user.actions";

@Component({
  selector: 'ciyw-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss'
})
export class AuthLoginComponent implements OnInit, OnDestroy{
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  loginForm: FormGroup | undefined;

  constructor(
    private readonly store: Store,
    private readonly apiClient: ApiClient,
    private readonly fb: FormBuilder,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.createLoginForm();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private createLoginForm() {
    this.loginForm = this.fb.group({
      login: [''],
      email: ['', [Validators.email]],
      phone: ['', [Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    }, { validator: atLeastOne });
  }

  onSubmit() {
    console.log(this.loginForm?.value);

    this.apiClient.auth_v1_login({
      login: this.loginForm?.value.login,
      email: this.loginForm?.value.email,
      phone: this.loginForm?.value.phone,
      password: this.loginForm?.value.password,
      rememberMe: false
    } as AuthLoginQuery)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        tap((result) => {
          this.store.dispatch(new SetToken(result));
        }),
        switchMap(() => this.apiClient.users_v1_current()),
        tap((result) => {
          this.store.dispatch(new SetUser(result));
          this.store.dispatch(new HomeRedirect());
        }),
        handleApiError(this.snackBar)
      ).subscribe();
  }
}

function atLeastOne(control: AbstractControl): ValidatorFn | { atLeastOne: boolean | undefined } | null{
  const login = control?.get('login')?.value;
  const email = control?.get('email')?.value;
  const phone = control?.get('phone')?.value;

  if (!login && !email && !phone) {
    return { atLeastOne: true };
  }
  return null;
}
