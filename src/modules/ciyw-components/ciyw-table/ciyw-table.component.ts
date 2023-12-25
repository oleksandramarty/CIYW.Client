import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {BalanceInvoiceResponse, IBasePageableQuery, IBaseSortableQuery} from "../../../kernel/services/api-client";
import {Sort} from "@angular/material/sort";
import {CiywPaginatorComponent} from "../ciyw-paginator/ciyw-paginator.component";
import {VariableTypeEnum} from "../../../kernel/enums/variable-type.enum";
import {ITableFilterHelper} from "../../../kernel/mappers/table.mapper";
import {capitalizeFirstChar} from "../../../kernel/helpers/string.helper";

@Component({
  selector: 'ciyw-table',
  templateUrl: './ciyw-table.component.html',
  styleUrl: './ciyw-table.component.scss'
})
export class CiywTableComponent<T> implements OnInit{
  @Input() isBusy: boolean | undefined = false;
  @Input() withPaginator: boolean = true;
  @Input() total: number = 0;
  @Input() displayedColumns: string[] | undefined;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 100];
  @Input() dataSource: any;

  @Output() filterChanged: EventEmitter<ITableFilterHelper> = new EventEmitter<ITableFilterHelper>();
  arrayPipeParams = ['test1', 'test2', 10, true];
  @ViewChild(CiywPaginatorComponent) paginatorComp: CiywPaginatorComponent | undefined;

  variableTypes = VariableTypeEnum;

  sort: IBaseSortableQuery | undefined;

  ngOnInit(): void {
    this.sort = { column: 'Created', direction: 'desc'};
  }

  public announceSortChange(sortState: Sort): void {
    if (!!this.paginatorComp && this.withPaginator) {
      this.paginatorComp!.paginator!.pageNumber = 1;
      this.paginatorComp!.paginatorComp!.pageIndex = 0;
    }
    this.sort!.column = capitalizeFirstChar(sortState.active);
    this.sort!.direction = sortState.direction;

    this.filterChange();
  }

  public onPageChange(event: any) {

    this.filterChange();
  }

  private filterChange(): void {
    this.filterChanged.emit({
      paginator: this.paginatorComp?.paginator,
      sort: this.sort
    } as ITableFilterHelper);
  }
}
