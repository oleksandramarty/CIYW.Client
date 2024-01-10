import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {
  IGuidDictionaryResponse, IStringDictionaryResponse
} from "../../../../kernel/services/api-client";

@Component({
  selector: 'ciyw-input',
  templateUrl: './ciyw-input.component.html',
  styleUrl: './ciyw-input.component.scss'
})
export class CiywInputComponent {
@Input() placeholder: string | null = null;
@Input() type: string = 'text';
@Input() controlName: string | null = null;
@Input() controlGroup: FormGroup | null | undefined = null;
@Input() inline: boolean = false;
@Input() wrapperClass: string = '';
@Input() selectData: IGuidDictionaryResponse | IStringDictionaryResponse | null | undefined = null;
}
