import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ICiywConfirmDialogData, IEntityDialogData} from "../../../kernel/models/dialog-input-data.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {
  ApiClient,
  IBalanceInvoiceResponse,
  ICurrentUserResponse,
  IDictionariesResponse
} from "../../../kernel/services/api-client";
import {Select} from "@ngxs/store";
import {UserState} from "../../../kernel/store/state/user.state";
import {Observable, Subject, Subscription, takeUntil, tap} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DictionariesState} from "../../../kernel/store/state/dictionary.state";

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

  constructor(
    public dialogRef: MatDialogRef<InvoiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEntityDialogData | undefined,
    private readonly apiClient: ApiClient,
    private readonly fb: FormBuilder,
  ) {
    this.info = data;
  }

  ngOnInit(): void {
    if (!!this.dictionaries$) {
      this.subs.add(this.dictionaries$.subscribe(dictionaries => { this.dictionaries = dictionaries; }));
    }

    this.getInvoiceById();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private getInvoiceById(): void {
    this.apiClient.invoices_V1_GetInvoiceById(this.info?.entityId!)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        tap((result) => {
          this.invoice = result;
          this.createInvoiceForm();
        })
      ).subscribe();
  }

  private createInvoiceForm() {
    this.invoiceForm = this.fb.group({
      name: [this.invoice?.name, [Validators.required, Validators.maxLength(50)]],
      amount: [this.invoice?.amount, [Validators.required, Validators.min(0)]],
      date: [this.invoice?.date, [Validators.required]],
      type: [String(this.invoice?.type), [Validators.required]],
      currency: [this.invoice?.currency?.id, [Validators.required]],
      category: [this.invoice?.category?.id, [Validators.required]]
    });
  }
}
