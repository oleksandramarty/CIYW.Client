import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {IBaseSortableQuery} from "../../../kernel/services/api-client";
import {Sort} from "@angular/material/sort";
import {CiywPaginatorComponent} from "../ciyw-paginator/ciyw-paginator.component";
import {VariableTypeEnum} from "../../../kernel/enums/variable-type.enum";
import {capitalizeFirstChar} from "../../../kernel/helpers/string.helper";
import {MatDialog} from "@angular/material/dialog";
import {CiywConfirmDialogComponent} from "../ciyw-confirm-dialog/ciyw-confirm-dialog.component";
import {ICiywConfirmDialogData, IEntityDialogData} from "../../../kernel/models/dialog-input-data.model";
import {MessagesConstant} from "../../../kernel/constants/messages.constant";
import {CIYWTableDialogEnum, CIYWTableEnum} from "../../../kernel/enums/ciyw-table.enum";
import {IDisplayedCIYWTableColumn, IDisplayedCIYWTableSchema} from "../../../kernel/mappers/ciyw-table";
import {MatTableDataSource} from "@angular/material/table";
import {ComponentType} from "@angular/cdk/overlay";
import {TableFilterHelper} from "../../../kernel/mappers/table-filter-helper";
import {TableItemHelper} from "../../../kernel/mappers/table-item-helper";
import {InvoiceDialogComponent} from "../../areas/personal-area/dialogs/invoice-dialog/invoice-dialog.component";
import {UserDialogComponent} from "../../areas/admin-area/dialogs/user-dialog/user-dialog.component";

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

  @Output() filterChanged: EventEmitter<TableFilterHelper> = new EventEmitter<TableFilterHelper>();
  @ViewChild(CiywPaginatorComponent) paginatorComp: CiywPaginatorComponent | undefined;

  public variableTypes = VariableTypeEnum;

  public sort: IBaseSortableQuery | undefined;

  public tableSchema: IDisplayedCIYWTableSchema | undefined;

  public tableBtn = CIYWTableDialogEnum;

  private defaultSort = { column: 'Created', direction: 'desc'};

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.tableSchema = this.crateCIYWTableSchema(this.type);
    this.sort = this.defaultSort;
  }

  public announceSortChange(sortState: Sort): void {
    if (!!this.paginatorComp && this.withPaginator) {
      this.paginatorComp!.paginator!.pageNumber = 1;
      this.paginatorComp!.paginatorComp!.pageIndex = 0;
    }
    this.sort = this.defaultSort;
    this.sort!.column = capitalizeFirstChar(sortState.active);
    this.sort!.direction = sortState.direction;

    if (this.type === CIYWTableEnum.AdminUsers && this.sort!.column === 'Balance') {
      this.sort!.parentClass = 'UserBalance';
      this.sort!.column = 'Amount';
    }

    this.filterChange();
  }

  public onPageChange(event: any) {
    this.filterChange();
  }

  public openDialog(type: CIYWTableDialogEnum, element?: TableItemHelper | null): void {
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

  private openAddOrEditEntityDialog(className: ComponentType<any>, element?: TableItemHelper | null): void {
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

  private openConfirmDeleteDialog(element: TableItemHelper): void {
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
    } as TableFilterHelper);
  }

  private crateCIYWTableSchema(type: CIYWTableEnum | undefined): IDisplayedCIYWTableSchema {
    if (!type) {
      return {
        displayedColumns: [],
        items: [],
      };
    }

    let items: IDisplayedCIYWTableColumn[] = [];
    let addButtonText: string | null = '';
    let addButtonClassName: ComponentType<any> | null = null;

    switch (type) {
      case CIYWTableEnum.HomeUserInvoices:
        items = [
          { title: 'Date', value: 'date', isSortable: true },
          { title: 'Category', value: 'category', isSortable: true },
          { title: 'Name', value: 'name', isSortable: true },
          { title: 'Amount', value: 'amount', isSortable: true },
        ];
        addButtonText = 'Add invoice';
        addButtonClassName = InvoiceDialogComponent;
        break
      case CIYWTableEnum.AdminUsers:
        items = [
          { title: 'Avatar', value: 'avatar', isSortable: false },
          { title: 'Date', value: 'date', isSortable: true },
          { title: 'Login', value: 'login', isSortable: false },
          { title: 'Full name', value: 'fullName', isSortable: false },
          { title: 'Phone', value: 'phone', isSortable: false },
          { title: 'Email', value: 'email', isSortable: false },
          { title: 'Amount', value: 'balance', isSortable: true, parentClass: 'UserBalance' },
        ];
        addButtonText = 'Add user';
        addButtonClassName = UserDialogComponent;
        break
    }

    switch (type) {
      case CIYWTableEnum.HomeUserInvoices:
      case CIYWTableEnum.AdminUsers:
        items.push(
          { title: '', value: 'edit', isSortable: false, style: { width: { attr: 'width', value: 30 }}, dialogType: CIYWTableDialogEnum.EditBtn },
          { title: '', value: 'delete', isSortable: false, style: { width: { attr: 'width', value: 30 }}, dialogType: CIYWTableDialogEnum.DeleteBtn },
        );
        break
    }

    return {
      displayedColumns: items.map(r => r.value),
      items,
      addButtonText,
      addButtonClassName,
    } as IDisplayedCIYWTableSchema;
  }
}
