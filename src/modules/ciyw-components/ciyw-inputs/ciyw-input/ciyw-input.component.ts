import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {
  FormItemOkHintModel,
  IGuidDictionaryResponse, IStringDictionaryResponse
} from "../../../../kernel/services/api-client";

@Component({
  selector: 'ciyw-input',
  templateUrl: './ciyw-input.component.html',
  styleUrl: './ciyw-input.component.scss'
})
export class CiywInputComponent {
@Input() label: string | undefined | null = null;
@Input() placeholder: string | undefined | null = null;
@Input() type: string = 'text';
@Input() controlName: string | undefined | null = null;
@Input() controlGroup: FormGroup | null | undefined = null;
@Input() inline: boolean = false;
@Input() wrapperClass: string = '';
@Input() okHint?: FormItemOkHintModel | undefined;
@Input() selectData: IGuidDictionaryResponse | IStringDictionaryResponse | null | undefined = null;
}
