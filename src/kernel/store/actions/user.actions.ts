import {IUserResponse, ITokenResponse} from "../../services/api-client";
import {IUserBalance} from "../../models/user.model";

export class LoginRedirect {
  static type = '[User] LoginRedirect'
}

export class OnLogout {
  static type = '[User] OnLogout'
  constructor() {}
}

export class SetToken {
  static type = '[User] SetToken'
  constructor(public data: ITokenResponse) {}
}

export class SetUser {
  static type = '[User] SetUser';
  constructor(public data: IUserResponse) {}
}

export class SetUserBalance {
  static type = '[User] SetUserBalance';
  constructor(public data: IUserBalance) {}
}

export class ResetUser {
  static type = '[User] ResetUser';
  constructor() {}
}

export class HomeRedirect {
  static type = '[User] HomeRedirect';
  constructor() {}
}
