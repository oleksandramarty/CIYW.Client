import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'ciyw-checkbox',
  templateUrl: './ciyw-checkbox.component.html',
  styleUrl: './ciyw-checkbox.component.scss'
})
export class CiywCheckboxComponent {
  @Input() label: string | null = null;
  @Input() placeholder: string | null = null;
  @Input() controlName: string | null = null;
  @Input() controlGroup: FormGroup | null | undefined = null;
  @Input() inline: boolean = false;
  @Input() wrapperClass: string = '';
  @Input() hint?: string | undefined;
}
