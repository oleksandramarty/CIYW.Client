import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {Subject, switchMap, takeUntil, tap} from "rxjs";
import {
  ApiClient, BaseIdsListQuery,
  IBaseSortableQuery, IImageDataResponse,
  IPaginator, Paginator, UsersImagesQuery,
} from "../../../../kernel/services/api-client";
import {IUserBalance, IUserType} from "../../../../kernel/models/user.model";
import {MatTableDataSource} from "@angular/material/table";
import {CIYWTableEnum} from "../../../../kernel/enums/ciyw-table.enum";
import {IListWithIncludeHelper} from "../../../../kernel/models/common.model";
import {FormBuilder} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {GraphQLService} from "../../../../kernel/graph-ql/graph-ql.service";
import {handleApiError} from "../../../../kernel/helpers/rxjs.helper";
import {TableFilterHelper} from "../../../../kernel/mappers/table-filter-helper";
import {TableInvoiceColumns} from "../../../../kernel/mappers/table-invoice-columns";
import {TableUserColumns} from "../../../../kernel/mappers/table-user-columns";

@Component({
  selector: 'ciyw-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss'
})
export class AdminUsersComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();

  dataSource: MatTableDataSource<any> | undefined;

  tableType = CIYWTableEnum;


  graphQLUsers: IListWithIncludeHelper<IUserType> | undefined;

  paginator: IPaginator | undefined;
  sort: IBaseSortableQuery | undefined;

  isBusy: boolean | undefined = true;

  constructor(
    private fb: FormBuilder,
    private readonly store: Store,
    private readonly apiClient: ApiClient,
    private readonly snackBar: MatSnackBar,
    private graphQlService: GraphQLService,
  ) {}

  ngOnInit() {
    this.paginator = {
      isFull: false,
      pageNumber: 1,
      pageSize: 10,
    };

    this.sort = { column: 'Created', direction: 'desc'};

    this.getUsers();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public filterChanged(event: TableFilterHelper): void {
    this.sort = event.sort;
    this.paginator = event.paginator;
    this.getUsers();
  }

  private getUsers(): void {
    this.getGraphQLUsers();
  }

  private getGraphQLUsers(): void {
    this.isBusy = true;
    this.dataSource = new MatTableDataSource<any>([]);
    this.graphQlService.getAdminUsers(this.paginator, this.sort)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        switchMap((result) => {
          this.graphQLUsers = result?.data?.users;
          if (!this.dataSource) {
            this.dataSource = new MatTableDataSource<any>([]);
          }

          let ids: string[] = [];
          this.graphQLUsers?.entities.forEach((item) => {
            ids.push(item.id!);
          });

          return this.apiClient.adminUsers_V1_GetUsersImages({ ids: {ids} as BaseIdsListQuery, paginator: {pageNumber: 1, pageSize: 5, isFull: true} as Paginator } as UsersImagesQuery)
        }),
        tap((result) => {
          this.dataSource!.data = TableUserColumns.Map(this.graphQLUsers, result as IListWithIncludeHelper<IImageDataResponse> | undefined);
          this.isBusy = false;
        }),
        handleApiError(this.snackBar),
      ).subscribe();
  }
}

