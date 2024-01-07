import {IBaseDateEntityType, IBaseEntityType, IBaseModifiedEntityType} from "./common.model";

export interface ICategoryType extends IBaseEntityType, IBaseModifiedEntityType {
  name?: string | undefined;
  description?: string | undefined;
  ico?: string | undefined;
  isActive?: boolean | undefined;
}
