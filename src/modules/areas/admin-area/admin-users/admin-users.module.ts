import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {AdminUsersComponent} from "./admin-users.component";
import {CiywTableModule} from "../../../ciyw-components/ciyw-table/ciyw-table.module";
import {CiywLoaderModule} from "../../../ciyw-components/ciyw-loader/ciyw-loader.module";
import {CiywInputModule} from "../../../ciyw-components/ciyw-inputs/ciyw-input/ciyw-input.module";
import {CiywCheckboxModule} from "../../../ciyw-components/ciyw-inputs/ciyw-checkbox/ciyw-checkbox.module";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogClose} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AdminUsersComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    CiywLoaderModule,
    CiywTableModule,

    CiywInputModule,
    CiywCheckboxModule,
    MatButtonModule,
    MatDialogClose,
  ],
  exports: [
    AdminUsersComponent,
  ]
})
export class AdminUsersModule {}
