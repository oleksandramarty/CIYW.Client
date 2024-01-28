import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {
  ApiClient, FormItemInputType,
  FormItemModel,
  FormItemValidatorTypeEnum,
  FormModel,
  FormTypeEnum
} from "../../../kernel/services/api-client";
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Store} from "@ngxs/store";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable, Subject, takeUntil, tap} from "rxjs";
import {handleApiError} from "../../../kernel/helpers/rxjs.helper";
import {TableFilterHelper} from "../../../kernel/mappers/table-filter-helper";

@Component({
  selector: 'ciyw-form-group',
  templateUrl: './ciyw-form-group.component.html',
  styleUrl: './ciyw-form-group.component.scss'
})
export class CiywFormGroupComponent implements OnInit, OnDestroy{
  @Input() formType: FormTypeEnum | undefined;
  @Output() onSubmitClicked: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  public formGroup: FormGroup | undefined;
  public schema: FormModel | undefined;

  public inoutType = FormItemInputType;

  constructor(
    private readonly store: Store,
    private readonly apiClient: ApiClient,
    private readonly snackBar: MatSnackBar,
  ) {}

  get schemaObservable(): Observable<FormModel> | null {
    if (!this.formType) {
      return null;
    }
    switch (this.formType) {
      case FormTypeEnum.AUTH_LOGIN:
        return this.apiClient.definitions_V1_GetAuthSchema(this.formType);
      default:
        return this.apiClient.definitions_V1_GetNonAuthSchema(this.formType);
    }
  }

  ngOnInit() {
    this.schemaObservable
      ?.pipe(
        takeUntil(this.ngUnsubscribe),
        tap((result) => {
          this.schema = result;
          this.createFormGroup();
        }),
        handleApiError(this.snackBar),
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public onSubmit(): void {
    this.onSubmitClicked.emit(this.formGroup);
  }

  private createFormGroup() {
    if (!!this.formGroup || !this.schema) {
      return;
    }

    let atLeastOneValidators: string[] = [];
    atLeastOneValidators = this.getDistinctElements(atLeastOneValidators);

    this.formGroup = new FormGroup({});

    this.schema.controls?.forEach((control) => {
      this.formGroup?.addControl(control.name!, new FormControl(control.defaultValue, this.addValidators(control)));
      const index = control.validators?.findIndex(v => v.validatorType === FormItemValidatorTypeEnum.AtLeastOne) ?? -1;
      if (index > -1) {
        atLeastOneValidators.push(control.validators![index].value!);
      }
    });

    atLeastOneValidators = this.getDistinctElements(atLeastOneValidators);

    console.log(this.formGroup)
  }

  //TODO add at least one
  private addValidators(control: FormItemModel): ValidatorFn[] | null {
    const temp: ValidatorFn[] = [];
    control.validators?.forEach((validator) => {
      switch (validator.validatorType){
        case FormItemValidatorTypeEnum.MinLen:
          temp.push(Validators.minLength(Number(validator.value)));
          break;
        case FormItemValidatorTypeEnum.MaxLen:
          temp.push(Validators.maxLength(Number(validator.value)));
          break;
        case FormItemValidatorTypeEnum.Required:
          temp.push(Validators.required);
          break;
        case FormItemValidatorTypeEnum.Min:
          temp.push(Validators.min(Number(validator.value)));
          break;
        case FormItemValidatorTypeEnum.Max:
          temp.push(Validators.max(Number(validator.value)));
          break;
        case FormItemValidatorTypeEnum.Email:
          temp.push(Validators.email);
          break;
        case FormItemValidatorTypeEnum.Pattern:
          temp.push(Validators.pattern(String(validator.value)));
          break;
      }
    });

    return temp.length > 0 ? temp : null;
  }

  private getDistinctElements(array: string[]): string[] {
    return Array.from(new Set(array));
  }

  private atLeastOne(control: AbstractControl, atLeastOneValidators: string[]): ValidatorFn | { atLeastOne: { arr:any[] } } | null{
    const atLeastOneFields: any[] = [];
    atLeastOneValidators.forEach((item) => {
      const indexArr = item.split(':');
      const fields = indexArr[1].split('-');
      const arr: any[] = [];
      fields.forEach((field) => {
        arr.push(control?.get(field)?.value);
      });
      if (arr.findIndex(x => !!x) < 0) {
        atLeastOneFields.push(fields)
      }
    });

    if (atLeastOneFields.length > 0) {
      return { atLeastOne: { arr: atLeastOneFields } };
    }
    return null;
  }
}
