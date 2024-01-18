import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {CiywLoaderModule} from "../../../../ciyw-components/ciyw-loader/ciyw-loader.module";
import {CiywInputModule} from "../../../../ciyw-components/ciyw-inputs/ciyw-input/ciyw-input.module";
import {MatButtonModule} from "@angular/material/button";
import {UserDialogComponent} from "./user-dialog.component";

@NgModule({
  declarations: [
    UserDialogComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    CiywLoaderModule,
    MatDialogModule,
    MatButtonModule,

    CiywInputModule,
  ],
  exports: [
    UserDialogComponent,
  ]
})
export class UserDialogModule {}
