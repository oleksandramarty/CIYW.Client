import {ITableItemHelper} from "../mappers/ciyw-table.mapper";
import {VariableTypeEnum} from "../enums/variable-type.enum";
import {ComponentType} from "@angular/cdk/overlay";
import {IStyleHelper} from "../models/common.model";

export function createTableDateItem(
  value: Date | undefined,
  pipeParams: {
    [key: string]: Date | number | string | boolean | undefined
  } | null = null,
  htmlContent: string | undefined | null = null): ITableItemHelper {
  return {
    type: VariableTypeEnum.Date,
    value,
    icon: null,
    className: null,
    pipeParams: !pipeParams ? {format: 'yyyy-MM-dd HH:mm:ss'} : pipeParams,
    htmlContent,
  }
}

export function createTableCurrencyItem(
  value: number | undefined,
  pipeParams: {
    [key: string]: Date | number | string | boolean | undefined
  } | null = null,
  htmlContent: string | undefined | null = null): ITableItemHelper {
  return {
    type: VariableTypeEnum.Currency,
    value,
    icon: null,
    className: null,
    pipeParams: !pipeParams ? {currency: 'USD'} : pipeParams,
    htmlContent,
  }
}

export function createTableDefaultItem(
  value: string | undefined,
  htmlContent: string | undefined | null = null): ITableItemHelper {
  return {
    type: VariableTypeEnum.Default,
    value,
    icon: null,
    className: null,
    pipeParams: null,
    htmlContent,
  }
}

export function createTableIconItem(
  value: string | undefined,
  icon: string | null,
  className: ComponentType<any> | null,
  htmlContent: string | undefined | null = null): ITableItemHelper {
  return {
    type: VariableTypeEnum.Icon,
    value,
    icon,
    className,
    pipeParams: null,
    htmlContent,
  }
}
