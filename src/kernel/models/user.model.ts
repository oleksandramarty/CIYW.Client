import {
  IUserResponse,
  ITokenResponse,
  ImageDataResponse,
  IImageDataResponse,
  IActiveUserResponse
} from "../services/api-client";
import {IBaseDateEntityType, IBaseEntityType, IBaseModifiedEntityType} from "./common.model";
import {ICurrencyType} from "./currency.model";

export class User {
  user: IUserResponse | undefined;
  token: ITokenResponse | undefined;
  balance: IUserBalance | undefined;
  avatar: string | undefined;
  active: IActiveUserResponse | undefined;
}

export interface IUserBalance {
  amount: number | undefined;
  isoCode: string | undefined;
  symbol: string | undefined;
  currencyId?: string | undefined;
  currency?: ICurrencyType | undefined;
}

export interface IUserType extends IBaseEntityType, IBaseModifiedEntityType, IBaseDateEntityType{
  lastName?: string | undefined;
  firstName?: string | undefined;
  login?: string | undefined;
  email?: string | undefined;
  phoneNumber?: string | undefined;
  userBalance?: IUserBalance | undefined;
}
