import {ITableItemHelper} from "../mappers/table.mapper";
import {VariableTypeEnum} from "../enums/variable-type.enum";

export function createTableDateItem(value: Date | undefined, pipeParams: {
  [key: string]: Date | number | string | boolean | undefined
} | null = null): ITableItemHelper {
  return {
    type: VariableTypeEnum.Date,
    value,
    pipeParams: !pipeParams ? {format: 'yyyy-MM-dd HH:mm:ss'} : pipeParams
  }
}

export function createTableCurrencyItem(value: number | undefined, pipeParams: {
  [key: string]: Date | number | string | boolean | undefined
} | null = null): ITableItemHelper {
  return {
    type: VariableTypeEnum.Currency,
    value,
    pipeParams: !pipeParams ? { currency: 'USD'} : pipeParams
  }
}

export function createTableDefaultItem(value: string | undefined): ITableItemHelper {
  return {
    type: VariableTypeEnum.Default,
    value,
    pipeParams: null,
  }
}
