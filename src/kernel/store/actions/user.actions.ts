import {IUserResponse, ITokenResponse, IActiveUserResponse} from "../../services/api-client";
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

export class SetAvatar {
  static type = '[User] SetAvatar'
  constructor(public data: string | undefined) {}
}

export class SetActive {
  static type = '[User] SetActive'
  constructor(public data: IActiveUserResponse | undefined) {}
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
