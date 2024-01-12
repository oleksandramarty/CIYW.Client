import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {IEntityDialogData} from "../../../kernel/models/dialog-input-data.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {
  ApiClient,
  IBalanceInvoiceResponse,
  ICurrentUserResponse,
  IDictionariesResponse
} from "../../../kernel/services/api-client";
import {Select} from "@ngxs/store";
import {UserState} from "../../../kernel/store/state/user.state";
import {finalize, Observable, Subject, Subscription, switchMap, takeUntil, tap} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DictionariesState} from "../../../kernel/store/state/dictionary.state";
import {GraphQLService} from "../../../kernel/graph-ql/graph-ql.service";
import {handleApiError, successMessage} from "../../../kernel/helpers/rxjs.helper";
import {MatSnackBar} from "@angular/material/snack-bar";
import moment from 'moment';
import {noteFieldsRequiredValidator} from "../../../kernel/helpers/validator.helper";

@Component({
  selector: 'invoice-dialog',
  templateUrl: './invoice-dialog.component.html',
  styleUrl: './invoice-dialog.component.scss'
})
export class InvoiceDialogComponent implements OnInit, OnDestroy{
  @Select(UserState.getUser) user$: Observable<ICurrentUserResponse> | undefined;
  @Select(DictionariesState.getDictionaries) dictionaries$: Observable<IDictionariesResponse> | undefined;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  subs = new Subscription();
  public info: IEntityDialogData | undefined;
  public invoice: IBalanceInvoiceResponse | null = null;
  public invoiceForm: FormGroup | null | undefined;

  public dictionaries: IDictionariesResponse | undefined;
  public isBusy: boolean | null = true;

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
      this.getInvoiceById();
    } else {
      this.createInvoiceForm();
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public createOrUpdateInvoice(): void {
    if (this.isEdit) {

    } else {
      this.graphQLService.createInvoice(
        this.invoiceForm?.value.name,
        Number(this.invoiceForm?.value.amount),
        this.invoiceForm?.value.categoryId,
        this.invoiceForm?.value.currencyId,
        moment(this.invoiceForm?.value.date).format('YYYY-MM-DDTHH:mm:ss'),
        this.invoiceForm?.value.type,
        this.invoiceForm?.value.noteName,
        this.invoiceForm?.value.noteBody
      ).pipe(
        takeUntil(this.ngUnsubscribe),
        tap(() => {
          this.dialogRef.close(true);
        }),
        handleApiError(this.snackBar),
      ).subscribe();
    }
  }

  private getInvoiceById(): void {
    this.getGraphQLInvoiceById();
  }

  private getGraphQLInvoiceById(): void {
    this.graphQLService.getUserInvoice(this.info?.entityId!)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        tap((result) => {
          this.invoice = result?.data?.invoice as IBalanceInvoiceResponse;
          this.createInvoiceForm();
        }),
      ).subscribe();
  }

  private getApiInvoiceById(): void {
    this.apiClient.invoices_V1_GetInvoiceById(this.info?.entityId!)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        tap((result) => {
          this.invoice = result;
        }),
        handleApiError(this.snackBar),
        finalize(() => this.createInvoiceForm())
      ).subscribe();
  }

  private createInvoiceForm() {
    this.invoiceForm = this.fb.group({
      name: [this.invoice?.name, [Validators.required, Validators.maxLength(50)]],
      amount: [this.invoice?.amount, [Validators.required, Validators.min(0)]],
      date: [this.invoice?.date, [Validators.required]],
      type: [this.invoice?.type, [Validators.required]],
      currencyId: [this.invoice?.currencyId, [Validators.required]],
      categoryId: [this.invoice?.categoryId, [Validators.required]],
      noteName: [this.invoice?.note?.name],
      noteBody: [this.invoice?.note?.body],
    }, { validators: noteFieldsRequiredValidator() });
    this.isBusy = false;
  }
}
