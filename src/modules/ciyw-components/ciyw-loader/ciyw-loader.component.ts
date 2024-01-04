import {Component, Input} from '@angular/core';

@Component({
  selector: 'ciyw-loader',
  templateUrl: './ciyw-loader.component.html',
  styleUrl: './ciyw-loader.component.scss'
})
export class CiywLoaderComponent {
  @Input() diameter: number | null = 50;
}
