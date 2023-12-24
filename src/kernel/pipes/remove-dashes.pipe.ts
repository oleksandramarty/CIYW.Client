import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeDashes'
})
export class RemoveDashesPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/-/g, '');
  }
}
