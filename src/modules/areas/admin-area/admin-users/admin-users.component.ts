import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {Observable, Subject, Subscription, switchMap, takeUntil, tap} from "rxjs";
import {
  ApiClient, BaseDateRangeQuery, BaseIdsListQuery,
  IBaseSortableQuery, IDictionariesResponse, IImageDataResponse,
  IPaginator, IUsersQuery, Paginator, UsersImagesQuery,
} from "../../../../kernel/services/api-client";
import {IUserBalance, IUserType} from "../../../../kernel/models/user.model";
import {MatTableDataSource} from "@angular/material/table";
import {CIYWTableEnum} from "../../../../kernel/enums/ciyw-table.enum";
import {IListWithIncludeHelper} from "../../../../kernel/models/common.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {GraphQLService} from "../../../../kernel/graph-ql/graph-ql.service";
import {handleApiError} from "../../../../kernel/helpers/rxjs.helper";
import {TableFilterHelper} from "../../../../kernel/mappers/table-filter-helper";
import {TableInvoiceColumns} from "../../../../kernel/mappers/table-invoice-columns";
import {TableUserColumns} from "../../../../kernel/mappers/table-user-columns";
import {noteFieldsRequiredValidator} from "../../../../kernel/helpers/validator.helper";
import {DictionariesState} from "../../../../kernel/store/state/dictionary.state";
import moment from "moment/moment";

@Component({
  selector: 'ciyw-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss'
})
export class AdminUsersComponent implements OnInit, OnDestroy {
  @Select(DictionariesState.getDictionaries) dictionaries$: Observable<IDictionariesResponse> | undefined;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  subs = new Subscription();

  public dictionaries: IDictionariesResponse | undefined;

  dataSource: MatTableDataSource<any> | undefined;

  tableType = CIYWTableEnum;

  public userForm: FormGroup | null | undefined;

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
    if (!!this.dictionaries$) {
      this.subs.add(this.dictionaries$.subscribe(dictionaries => { this.dictionaries = dictionaries; }));
    }

    this.paginator = {
      isFull: false,
      pageNumber: 1,
      pageSize: 10,
    };

    this.createUserForm();

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

  public usersFilterChanged(): void {
    this.getGraphQLUsers();
  }

  private getUsers(): void {
    this.getGraphQLUsers();
  }

  private getGraphQLUsers(): void {
    this.isBusy = true;
    this.dataSource = new MatTableDataSource<any>([]);
    this.graphQlService.getAdminUsers({
      isBlocked: !!this.userForm?.value.isBlocked,
      phone: this.userForm?.value.phone,
      email: this.userForm?.value.email,
      login: this.userForm?.value.login,
      name: this.userForm?.value.name,
      createdRange: {
        dateFrom: moment(this.userForm?.value.createdRangeFrom).toDate(),
        dateTo: moment(this.userForm?.value.createdRangeTo).toDate(),
      },
      updatedRange: {
        dateFrom: moment(this.userForm?.value.updatedRangeFrom).toDate(),
        dateTo: moment(this.userForm?.value.updatedRangeTo).toDate(),
      },
      currencyIds: { ids: [this.userForm?.value.currencyIds] },
      roleIds: { ids: [this.userForm?.value.roleIds] },
      tariffIds: { ids: [this.userForm?.value.tariffIds] },
      paginator: this.paginator,
      sort: this.sort,
    } as IUsersQuery)
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

  private createUserForm() {
    this.userForm = this.fb.group({
      isBlocked: [null],
      phone: [null],
      email: [null],
      login: [null],
      name: [null],
      createdRangeFrom: [null],
      createdRangeTo: [null],
      updatedRangeFrom: [null],
      updatedRangeTo: [null],
      currencyIds: [null],
      roleIds: [null],
      tariffIds: [null],
    });
    this.isBusy = false;
  }
}

