import {ITableEditableColumns, TableEditableColumns} from "./table-editable-columns";
import {ITableItemHelper, TableItemHelper} from "./table-item-helper";
import {IListWithIncludeHelper} from "../models/common.model";
import {IUserType} from "../models/user.model";
import {IImageDataResponse} from "../services/api-client";
import {UserDialogComponent} from "../../modules/areas/admin-area/dialogs/user-dialog/user-dialog.component";

export interface ITableUserColumns extends ITableEditableColumns{
  avatar: ITableItemHelper | undefined;
  date: ITableItemHelper | undefined;
  humanize_date: ITableItemHelper | undefined;
  fullName: ITableItemHelper | undefined;
  phone: ITableItemHelper | undefined;
  login: ITableItemHelper | undefined;
  email: ITableItemHelper | undefined;
  balance: ITableItemHelper | undefined;
}

export class TableUserColumns extends TableEditableColumns implements ITableUserColumns {
  avatar: TableItemHelper | undefined;
  date: TableItemHelper | undefined;
  humanize_date: TableItemHelper | undefined;
  fullName: TableItemHelper | undefined;
  phone: TableItemHelper | undefined;
  login: TableItemHelper | undefined;
  email: TableItemHelper | undefined;
  balance: TableItemHelper | undefined;

  constructor(
    avatar?: TableItemHelper | undefined,
    date?: TableItemHelper | undefined,
    humanize_date?: TableItemHelper | undefined,
    fullName?: TableItemHelper | undefined,
    phone?: TableItemHelper | undefined,
    login?: TableItemHelper | undefined,
    email?: TableItemHelper | undefined,
    balance?: TableItemHelper | undefined,
    editVal?: TableItemHelper | undefined,
    deleteVal?: TableItemHelper | undefined
  ) {
    super(editVal, deleteVal);
    this.avatar = avatar;
    this.date = date;
    this.humanize_date = humanize_date;
    this.fullName = fullName;
    this.phone = phone;
    this.login = login;
    this.email = email;
    this.balance = balance;
  }

  public static Map(users: IListWithIncludeHelper<IUserType> | undefined, avatars: IListWithIncludeHelper<IImageDataResponse> | undefined): TableUserColumns[] {
    return !!users?.entities ? users!.entities.map(item => {

      const index = avatars?.entities?.findIndex(x => x.entityId === item.id) ?? -1;

      const temp = {
        avatar: TableItemHelper.CreateTableImageItem(!!avatars?.entities && index > -1 ? avatars.entities[index] as IImageDataResponse : undefined),
        date: TableItemHelper.CreateTableDateItem(item.date, {format: 'yyyy-MM-dd'}, `<div class="opacity-05 f-075">(${item.modified})</div>`),
        humanize_date: TableItemHelper.CreateTableDefaultItem(item.humanize_date),
        fullName: TableItemHelper.CreateTableDefaultItem(`${item.firstName} ${item.lastName}`),
        phone: TableItemHelper.CreateTableDefaultItem(item.phoneNumber),
        login: TableItemHelper.CreateTableDefaultItem(item.login),
        email: TableItemHelper.CreateTableDefaultItem(item.email),
        balance: TableItemHelper.CreateTableCurrencyItem(item.userBalance?.amount, { currency: item.userBalance?.currency?.isoCode }),
        edit: TableItemHelper.CreateTableIconItem(item.id, 'edit', UserDialogComponent),
        delete: TableItemHelper.CreateTableIconItem(item.id, 'delete', null),
      } as TableUserColumns;
      return temp;
    }) : [];
  }
}
