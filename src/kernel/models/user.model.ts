import {ICurrentUserResponse, ITokenResponse} from "../services/api-client";

export class User {
  user: ICurrentUserResponse | undefined;
  token: ITokenResponse | undefined;
  balance: IUserBalance | undefined;
}

export interface IUserBalance {
  amount: number | undefined;
  isoCode: string | undefined;
  symbol: string | undefined;
}
