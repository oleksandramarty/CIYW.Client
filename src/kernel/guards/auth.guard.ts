import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {UserState} from "../store/state/user.state";
import {Store} from "@ngxs/store";
import {ResetUser} from "../store/actions/user.actions";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!(UserState.localRememberMeStatus
      ? UserState.localToken
      : UserState.sessionToken || '')
    )  {
      this.store.dispatch(new ResetUser());
      return false;
    }
    return true;
  }
}
