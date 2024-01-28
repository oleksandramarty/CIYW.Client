import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {MatFormFieldModule} from "@angular/material/form-field";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {CiywFormGroupComponent} from "./ciyw-form-group.component";
import {CiywInputModule} from "../ciyw-inputs/ciyw-input/ciyw-input.module";
import {CiywCheckboxModule} from "../ciyw-inputs/ciyw-checkbox/ciyw-checkbox.module";

@NgModule({
  declarations: [
    CiywFormGroupComponent
  ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,

        MatInputModule,
        MatDatepickerModule,
        MatIconModule,
        MatDialogModule,
        MatFormFieldModule,
        MatCardModule,
        MatButtonModule,

        CiywInputModule,
        CiywCheckboxModule,
    ],
  exports: [
    CiywFormGroupComponent,
  ]
})
export class CiywFormGroupModule {}
