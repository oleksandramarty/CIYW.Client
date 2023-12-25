import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {IBasePageableQuery} from "../../../kernel/services/api-client";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'ciyw-paginator',
  templateUrl: './ciyw-paginator.component.html',
  styleUrl: './ciyw-paginator.component.scss'
})
export class CiywPaginatorComponent implements OnInit{
  @Input() pageSizeOptions: number[] = [5, 10, 25, 100];
  @Input() total: number = 0;

  @Output() pageChanged: EventEmitter<IBasePageableQuery | undefined> = new EventEmitter<IBasePageableQuery | undefined>();

  @ViewChild(MatPaginator, { static: true }) paginatorComp: MatPaginator | undefined;

  paginator: IBasePageableQuery | undefined;

  ngOnInit(): void {
    this.paginator = {
      isFull: false,
      pageNumber: 1,
      pageSize: 10,
    };
  }

  public onPageChange(event: any) {
    if (!this.paginator) {
      return;
    }
    this.paginator!.pageNumber = event.pageIndex + 1;
    this.paginator!.pageSize = event.pageSize;

    this.pageChanged.emit(this.paginator);
  }
}
