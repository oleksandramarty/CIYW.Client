import {ITableItemHelper} from "../mappers/table.mapper";
import {VariableTypeEnum} from "../enums/variable-type.enum";
import {ComponentType} from "@angular/cdk/overlay";
import {ICiywConfirmDialogData} from "../models/dialog-input-data.model";

export function createTableDateItem(value: Date | undefined, pipeParams: {
  [key: string]: Date | number | string | boolean | undefined
} | null = null): ITableItemHelper {
  return {
    type: VariableTypeEnum.Date,
    value,
    icon: null,
    className: null,
    pipeParams: !pipeParams ? {format: 'yyyy-MM-dd HH:mm:ss'} : pipeParams
  }
}

export function createTableCurrencyItem(value: number | undefined, pipeParams: {
  [key: string]: Date | number | string | boolean | undefined
} | null = null): ITableItemHelper {
  return {
    type: VariableTypeEnum.Currency,
    value,
    icon: null,
    className: null,
    pipeParams: !pipeParams ? { currency: 'USD'} : pipeParams
  }
}

export function createTableDefaultItem(value: string | undefined): ITableItemHelper {
  return {
    type: VariableTypeEnum.Default,
    value,
    icon: null,
    className: null,
    pipeParams: null,
  }
}

export function createTableIconItem(value: string | undefined, icon: string | null, className: ComponentType<any> | null): ITableItemHelper {
  return {
    type: VariableTypeEnum.Icon,
    value,
    icon,
    className,
    pipeParams: null,
  }
}
