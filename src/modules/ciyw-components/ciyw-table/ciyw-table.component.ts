import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {IBasePageableQuery, IBaseSortableQuery} from "../../../kernel/services/api-client";
import {Sort} from "@angular/material/sort";
import {CiywPaginatorComponent} from "../ciyw-paginator/ciyw-paginator.component";

@Component({
  selector: 'ciyw-table',
  templateUrl: './ciyw-table.component.html',
  styleUrl: './ciyw-table.component.scss'
})
export class CiywTableComponent<T> implements OnInit{
  @Input() withPaginator: boolean = true;
  @Input() sortColumn: string = 'Created';
  @Input() total: number = 0;
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: MatTableDataSource<T> | undefined;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 100];

  @Output() filterChanged: EventEmitter<{
    paginator: IBasePageableQuery | undefined,
    sort: IBaseSortableQuery | undefined
  }> = new EventEmitter<{
    paginator: IBasePageableQuery | undefined,
    sort: IBaseSortableQuery | undefined
  }>();

  @ViewChild(CiywPaginatorComponent) paginatorComp: CiywPaginatorComponent | undefined;

  sort: IBaseSortableQuery | undefined;

  ngOnInit(): void {
    this.sort = { column: this.sortColumn, direction: 'desc'};
  }

  public announceSortChange(sortState: Sort): void {
    if (!!this.paginatorComp && this.withPaginator) {
      this.paginatorComp!.paginator!.pageNumber = 1;
    }
    this.sort!.column = sortState.active;
    this.sort!.direction = sortState.direction;

    this.filterChange();
  }

  public onPageChange(event: any) {
    this.filterChange();
  }

  public sort1(column: string): void {
    console.log(column);
  }

  private filterChange(): void {
    this.filterChanged.emit({
      paginator: this.paginatorComp?.paginator,
      sort: this.sort
    });
  }
}
