import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {IBaseSortableQuery} from "../../../kernel/services/api-client";
import {Sort} from "@angular/material/sort";
import {CiywPaginatorComponent} from "../ciyw-paginator/ciyw-paginator.component";
import {VariableTypeEnum} from "../../../kernel/enums/variable-type.enum";
import {ITableFilterHelper, ITableItemHelper} from "../../../kernel/mappers/table.mapper";
import {capitalizeFirstChar} from "../../../kernel/helpers/string.helper";
import {MatDialog} from "@angular/material/dialog";
import {CiywConfirmDialogComponent} from "../ciyw-confirm-dialog/ciyw-confirm-dialog.component";
import {ICiywConfirmDialogData, IEntityDialogData} from "../../../kernel/models/dialog-input-data.model";
import {MessagesConstant} from "../../../kernel/constants/messages.constant";

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
  @ViewChild(CiywPaginatorComponent) paginatorComp: CiywPaginatorComponent | undefined;

  public variableTypes = VariableTypeEnum;

  public sort: IBaseSortableQuery | undefined;

  constructor(private dialog: MatDialog) {
  }

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

  public openDialog(element: ITableItemHelper): void {
    if (element.icon === 'edit') {
      this.openEditEntityDialog(element);
    }
    if (element.icon === 'delete') {
      this.openConfirmDeleteDialog(element);
    }
  }

  private openEditEntityDialog(element: ITableItemHelper): void {
    const dialogRef = this.dialog.open(element.className!, {
      data: {
        entityId: element.value,
      } as IEntityDialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  private openConfirmDeleteDialog(element: ITableItemHelper): void {
    const dialogRef = this.dialog.open(CiywConfirmDialogComponent, {
      data: {
        title: MessagesConstant.AreYouSure,
        cancelBtn: MessagesConstant.Cancel,
        confirmBtn: MessagesConstant.Confirm
      } as ICiywConfirmDialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  private filterChange(): void {
    this.filterChanged.emit({
      paginator: this.paginatorComp?.paginator,
      sort: this.sort
    } as ITableFilterHelper);
  }
}
