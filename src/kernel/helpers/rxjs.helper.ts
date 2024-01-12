// common-error-handler.ts
import { catchError } from 'rxjs/operators';
import {finalize, throwError} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export function handleApiError(snackBar: MatSnackBar) {
  return catchError((error: any) => {
    console.error(error);
    snackBar.open(error?.message ?? 'An error occurred. Please try again.', 'Close', { duration: 3000 });
    return throwError(() => error);
  });
}

export function successMessage(snackBar: MatSnackBar, message?: string | null) {
  return finalize(() => {
    snackBar.open(message ?? 'Success', 'Close', { duration: 3000 });
  });
}
