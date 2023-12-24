import {ICurrentUserResponse, ITokenResponse} from "../../services/api-client";

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
  constructor(public data: ICurrentUserResponse) {}
}

export class ResetUser {
  static type = '[User] ResetUser';
  constructor() {}
}

export class HomeRedirect {
  static type = '[User] HomeRedirect';
  constructor() {}
}
