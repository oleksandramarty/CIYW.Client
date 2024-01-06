import {ApiClient, ICurrentUserResponse, ITokenResponse} from "../../services/api-client";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {RoleEnum} from "../../enums/role.enum";
import {
  LoginRedirect,
  OnLogout,
  SetToken,
  SetUser,
  ResetUser,
  HomeRedirect,
  SetUserBalance
} from "../actions/user.actions";
import {Navigate} from "@ngxs/router-plugin";
import {catchError, EMPTY, switchMap, tap, throwError} from "rxjs";
import {IUserBalance, User} from "../../models/user.model";

let token: string | null = '';
const defaults = {
  user: undefined,
  token: undefined,
  balance: undefined,
};

@State<User>({
  name: 'user',
  defaults,
})
@Injectable()
export class UserState {

  constructor(
    private readonly apiClient: ApiClient) {}

  @Selector()
  static getUser(user: User): ICurrentUserResponse | undefined {
    return user.user;
  }
  @Selector()
  static getBalance(user: User): IUserBalance | undefined {
    return user.balance;
  }

  @Selector()
  static isAuthorized(user: User): boolean {
    return (
      !!(UserState.localRememberMeStatus
        ? UserState.localToken
        : UserState.sessionToken || '') &&
      !!user &&
      !!user.user &&
      !!user.user.id
    );
  }

  @Selector()
  static isUser(user: User): boolean {
    return (
      !!user && String(user.user?.role) === String(RoleEnum.User)
    );
  }

  @Selector()
  static isAdmin(user: User): boolean {
    return (
      !!user && String(user.user?.role) === String(RoleEnum.Admin)
    );
  }

  @Action(LoginRedirect)
  LoginRedirect(ctx: StateContext<UserState>) {
    ctx.dispatch(new Navigate(['/auth/login']));
  }

  @Action(OnLogout)
  OnLogout({setState, dispatch}: StateContext<User>, {}) {
    this.apiClient.auth_V1_Logout()
      .pipe(
        tap(() => {
          setState(defaults);
          this.cleanSessionToken();
          token = null;
          dispatch(new Navigate(['/auth/login']));
        }),
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        })
      ).subscribe();
  }

  @Action(ResetUser)
  ResetUser({setState, dispatch}: StateContext<User>) {
    setState(defaults);
    this.cleanSessionToken();
    token = null;
    dispatch(new Navigate(['/auth/login']));
  }

  @Action(HomeRedirect)
  HomeRedirect(ctx: StateContext<UserState>) {
    ctx.dispatch(new Navigate(['/home']));
  }

  @Action(SetToken)
  SetToken({patchState}: StateContext<User>, {data}: any) {
    token = !!data && !!data.value ? data.value : '';
    this.sessionToken = String(token);
    patchState({token: data});
  }

  @Action(SetUser)
  SetUser({patchState}: StateContext<User>, {data}: any) {
    patchState({user: data});
  }
  @Action(SetUserBalance)
  SetUserBalance({patchState}: StateContext<User>, {data}: any) {
    patchState({balance: data});
  }

  cleanSessionToken() {
    sessionStorage.removeItem('sessionToken');
  }

  set sessionToken(token: string) {
    sessionStorage.setItem('sessionToken', token);
  }

  static get localToken() {
    const data = localStorage.getItem('@@STATE');
    if (!data) {
      return null;
    }
    const temp = JSON.parse(data);
    if (!temp || !temp.user || !temp.user.token) {
      sessionStorage.removeItem('sessionToken');
      localStorage.clear();
      return null;
    }
    return temp?.user?.token?.value ?? token;
  }

  static get localRememberMeStatus() {
    const data = localStorage.getItem('@@STATE');
    if (!data) {
      return false;
    }
    const temp = JSON.parse(data);
    // if (!temp || !temp.user || !temp.user.user) {
    //   sessionStorage.removeItem('sessionToken');
    //   localStorage.clear();
    //   return false;
    // }
    return !!temp && !!temp.user && temp.user.user
      ? !!temp.user.user.rememberMe
      : false;
  }

  static get user(): ICurrentUserResponse | null {
    const data = localStorage.getItem('@@STATE');
    if (!data) {
      return null;
    }
    const temp = JSON.parse(data);
    if (!temp || !temp.user || !temp.user.user) {
      return null;
    }
    return temp.user.user
  }

  static get sessionToken() {
    const temp = sessionStorage.getItem('sessionToken');
    return temp ? sessionStorage.getItem('sessionToken') : this.localToken;
  }

  set kkmUrl(kkmUrl: string) {
    sessionStorage.setItem('kkmUrl', kkmUrl)
  }

  set mtsAgentUrl(mtsAgentUrl: string) {
    sessionStorage.setItem('mtsAgentUrl', mtsAgentUrl)
  }

  static get kkmUrl() {
    return sessionStorage.getItem('kkmUrl')
  }

  static get mtsAgentUrl() {
    return sessionStorage.getItem('mtsAgentUrl')
  }
}
