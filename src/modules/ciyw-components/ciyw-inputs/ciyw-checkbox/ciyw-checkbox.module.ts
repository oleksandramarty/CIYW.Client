import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {CiywCheckboxComponent} from "./ciyw-checkbox.component";
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  declarations: [
    CiywCheckboxComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  exports: [
    CiywCheckboxComponent
  ]
})
export class CiywCheckboxModule {}
