import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {IBaseSortableQuery} from "../../../kernel/services/api-client";
import {Sort} from "@angular/material/sort";
import {CiywPaginatorComponent} from "../ciyw-paginator/ciyw-paginator.component";
import {VariableTypeEnum} from "../../../kernel/enums/variable-type.enum";
import {crateCIYWTableSchema, ITableFilterHelper, ITableItemHelper} from "../../../kernel/mappers/ciyw-table.mapper";
import {capitalizeFirstChar} from "../../../kernel/helpers/string.helper";
import {MatDialog} from "@angular/material/dialog";
import {CiywConfirmDialogComponent} from "../ciyw-confirm-dialog/ciyw-confirm-dialog.component";
import {ICiywConfirmDialogData, IEntityDialogData} from "../../../kernel/models/dialog-input-data.model";
import {MessagesConstant} from "../../../kernel/constants/messages.constant";
import {CIYWTableDialogEnum, CIYWTableEnum} from "../../../kernel/enums/ciyw-table.enum";
import {IDisplayedCIYWTableSchema} from "../../../kernel/models/ciyw-table.model";
import {MatTableDataSource} from "@angular/material/table";
import {ComponentType} from "@angular/cdk/overlay";

@Component({
  selector: 'ciyw-table',
  templateUrl: './ciyw-table.component.html',
  styleUrl: './ciyw-table.component.scss'
})
export class CiywTableComponent<T> implements OnInit{
  @Input() isBusy: boolean | undefined = false;
  @Input() withPaginator: boolean = true;
  @Input() total: number = 0;
  @Input() type: CIYWTableEnum | undefined;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 100];
  @Input() dataSource: MatTableDataSource<any> | undefined;

  @Output() filterChanged: EventEmitter<ITableFilterHelper> = new EventEmitter<ITableFilterHelper>();
  @ViewChild(CiywPaginatorComponent) paginatorComp: CiywPaginatorComponent | undefined;

  public variableTypes = VariableTypeEnum;

  public sort: IBaseSortableQuery | undefined;

  public tableSchema: IDisplayedCIYWTableSchema | undefined;

  public tableBtn = CIYWTableDialogEnum;

  private defaultSort = { column: 'Created', direction: 'desc'};

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.tableSchema = crateCIYWTableSchema(this.type);
    this.sort = this.defaultSort;
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

  public openDialog(type: CIYWTableDialogEnum, element?: ITableItemHelper | null): void {
    switch (type) {
      case CIYWTableDialogEnum.AddBtn:
        this.openAddOrEditEntityDialog(this.tableSchema?.addButtonClassName!, null);
        break;
      case CIYWTableDialogEnum.EditBtn:
        this.openAddOrEditEntityDialog(element!.className!, element);
        break;
      case CIYWTableDialogEnum.DeleteBtn:
        this.openConfirmDeleteDialog(element!);
        break;
    }
  }

  private openAddOrEditEntityDialog(className: ComponentType<any>, element?: ITableItemHelper | null): void {
    const dialogRef = this.dialog.open(className!, {
      width: '400px',
      maxWidth: '80vw',
      data: {
        entityId: element?.value ?? null,
      } as IEntityDialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.resetTable();
      }
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

  private resetTable(): void {
    this.paginatorComp!.resetPaginator();
    this.sort = this.defaultSort;
    this.filterChange();
  }

  private filterChange(): void {
    this.filterChanged.emit({
      paginator: this.paginatorComp?.paginator,
      sort: this.sort
    } as ITableFilterHelper);
  }
}
