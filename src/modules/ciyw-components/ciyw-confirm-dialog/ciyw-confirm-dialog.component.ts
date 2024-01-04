import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ICiywConfirmDialogData} from "../../../kernel/models/dialog-input-data.model";

@Component({
  selector: 'ciyw-confirm-dialog',
  templateUrl: './ciyw-confirm-dialog.component.html',
  styleUrl: './ciyw-confirm-dialog.component.scss'
})
export class CiywConfirmDialogComponent {
  public info: ICiywConfirmDialogData | undefined;
  constructor(
    public dialogRef: MatDialogRef<CiywConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICiywConfirmDialogData | undefined
  ) {
    this.info = data;
  }
}
