import {VariableTypeEnum} from "../enums/variable-type.enum";
import {IImageDataResponse} from "../services/api-client";
import {ComponentType} from "@angular/cdk/overlay";

interface IPipeParams {
  [key: string]: Date | number | string | boolean | undefined;
}

export interface ITableItemHelper {
  type: VariableTypeEnum;
  value: Date | number | string | boolean | IImageDataResponse | undefined;
  icon: string | null;
  className?: ComponentType<any> | null;
  pipeParams?: IPipeParams | null;
  htmlContent?: string | undefined | null;
}

export class TableItemHelper implements ITableItemHelper {
  type: VariableTypeEnum;
  value: Date | number | string | boolean | IImageDataResponse | undefined;
  icon: string | null;
  className?: ComponentType<any> | null;
  pipeParams?: IPipeParams | null;
  htmlContent?: string | undefined | null;

  constructor(
    type: VariableTypeEnum,
    value: Date | number | string | boolean | IImageDataResponse | undefined,
    icon: string | null,
    className?: ComponentType<any> | null,
    pipeParams?: IPipeParams | null,
    htmlContent?: string | undefined | null
  ) {
    this.type = type;
    this.value = value;
    this.icon = icon;
    this.className = className;
    this.pipeParams = pipeParams;
    this.htmlContent = htmlContent;
  }

  public static CreateTableDateItem(
    value: Date | undefined,
    pipeParams: {
      [key: string]: Date | number | string | boolean | undefined
    } | null = null,
    htmlContent: string | undefined | null = null): TableItemHelper {
    return {
      type: VariableTypeEnum.Date,
      value,
      icon: null,
      className: null,
      pipeParams: !pipeParams ? {format: 'yyyy-MM-dd HH:mm:ss'} : pipeParams,
      htmlContent,
    } as TableItemHelper;
  }

  public static CreateTableCurrencyItem(
    value: number | undefined,
    pipeParams: {
      [key: string]: Date | number | string | boolean | undefined
    } | null = null,
    htmlContent: string | undefined | null = null): TableItemHelper {
    return {
      type: VariableTypeEnum.Currency,
      value,
      icon: null,
      className: null,
      pipeParams: !pipeParams ? {currency: 'USD'} : pipeParams,
      htmlContent,
    } as TableItemHelper;
  }

  public static CreateTableDefaultItem(
    value: string | undefined,
    htmlContent: string | undefined | null = null): TableItemHelper {
    return {
      type: VariableTypeEnum.Default,
      value,
      icon: null,
      className: null,
      pipeParams: null,
      htmlContent,
    } as TableItemHelper;
  }

  public static CreateTableIconItem(
    value: string | undefined,
    icon: string | null,
    className: ComponentType<any> | null,
    htmlContent: string | undefined | null = null): TableItemHelper {
    return {
      type: VariableTypeEnum.Icon,
      value,
      icon,
      className,
      pipeParams: null,
      htmlContent,
    } as TableItemHelper;
  }

  public static CreateTableImageItem(
    value: IImageDataResponse | undefined): TableItemHelper {
    return {
      type: VariableTypeEnum.Avatar,
      value,
      icon: null,
      className: null,
      pipeParams: null,
      htmlContent: null,
    } as TableItemHelper;
  }
}
