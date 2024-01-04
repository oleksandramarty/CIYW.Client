import {CommonModule, NgOptimizedImage} from "@angular/common";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {CiywConfirmDialogComponent} from "./ciyw-confirm-dialog.component";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    CiywConfirmDialogComponent,
  ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,

        MatDialogModule,
        MatButtonModule,

        RouterModule,
        NgOptimizedImage
    ],
  exports: [
    CiywConfirmDialogComponent,
  ]
})
export class CiywConfirmDialogModule {}
