import {AbstractControl, ValidatorFn} from "@angular/forms";

export function noteFieldsRequiredValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const noteName = control.get('noteName')?.value;
    const noteBody = control.get('noteBody')?.value;

    if ((noteName === null || noteName === undefined) && (noteBody === null || noteBody === undefined)) {
      return { 'noteFieldsRequired': true };
    }

    return null;
  };
}
