import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Select} from "@ngxs/store";
import {Observable, Subject, Subscription, takeUntil, tap} from "rxjs";
import {
  ApiClient,
  IDictionariesResponse,
  IInvoiceResponse,
  IUserResponse
} from "../../../../../kernel/services/api-client";
import {DictionariesState} from "../../../../../kernel/store/state/dictionary.state";
import {IEntityDialogData} from "../../../../../kernel/models/dialog-input-data.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GraphQLService} from "../../../../../kernel/graph-ql/graph-ql.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {InvoiceDialogComponent} from "../../../personal-area/dialogs/invoice-dialog/invoice-dialog.component";

@Component({
  selector: 'ciyw-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss'
})
export class UserDialogComponent implements OnInit, OnDestroy{
  @Select(DictionariesState.getDictionaries) dictionaries$: Observable<IDictionariesResponse> | undefined;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  subs = new Subscription();
  public info: IEntityDialogData | undefined;
  public user: IUserResponse | null = null;
  public userFrom: FormGroup | null | undefined;

  public dictionaries: IDictionariesResponse | undefined;
  public isBusy: boolean | null = true;

  selectedFile: File | null = null;

  constructor(
    public dialogRef: MatDialogRef<InvoiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEntityDialogData | undefined,
    private readonly apiClient: ApiClient,
    private readonly fb: FormBuilder,
    private readonly graphQLService: GraphQLService,
    private readonly snackBar: MatSnackBar,
  ) {
    this.info = data;
  }

  get isEdit(): boolean {
    return !!this.info?.entityId;
  }

  ngOnInit(): void {
    if (!!this.dictionaries$) {
      this.subs.add(this.dictionaries$.subscribe(dictionaries => { this.dictionaries = dictionaries; }));
    }

    if (this.isEdit) {
      this.getUserById();
    } else {
      this.createUserForm();
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public createOrUpdateUser(): void {
    if (this.isEdit) {

    } else {

    }
  }

  private getUserById(): void {
    this.getGraphQLUserById();
  }

  private getGraphQLUserById(): void {
    this.graphQLService.getUserById(this.info?.entityId!)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        tap((result) => {
          this.user = result?.data?.userByIdForAdmin as IUserResponse;
          this.createUserForm();
        }),
      ).subscribe();
  }

  private createUserForm() {
    this.userFrom = this.fb.group({
      login: [this.user?.login],
      lastName: [this.user?.lastName],
      firstName: [this.user?.firstName],
      patronymic: [this.user?.patronymic],
      email: [this.user?.email],
      isTemporaryPassword: [this.user?.isTemporaryPassword],
      isBlocked: [this.user?.isBlocked],
      roleId: [this.user?.roleId],
      phone: [this.user?.phoneNumber],
      currencyId: [this.user?.currencyId],
      tariffId: [this.user?.tariffId],
      emailConfirmed: [this.user?.emailConfirmed],
      phoneNumberConfirmed: [this.user?.phoneNumberConfirmed],
    });
    this.isBusy = false;
  }

  onFileChange(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.selectedFile = fileList[0];
    } else {
      this.selectedFile = null;
    }
  }

  uploadFile(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);


    } else {
      console.error('No file selected');
    }
  }
}
