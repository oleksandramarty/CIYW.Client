import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {InvoiceDialogComponent} from "./invoice-dialog.component";
import {CiywLoaderModule} from "../../ciyw-components/ciyw-loader/ciyw-loader.module";
import {CiywInputModule} from "../../ciyw-components/ciyw-inputs/ciyw-input/ciyw-input.module";

@NgModule({
  declarations: [
    InvoiceDialogComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    CiywLoaderModule,
    MatDialogModule,

    CiywInputModule,
  ],
  exports: [
    InvoiceDialogComponent,
  ]
})
export class InvoiceDialogModule {}
