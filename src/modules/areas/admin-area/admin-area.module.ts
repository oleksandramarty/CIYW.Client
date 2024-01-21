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
import {MatSortModule} from "@angular/material/sort";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSelectModule} from "@angular/material/select";
import {AdminAreaComponent} from "./admin-area/admin-area.component";
import {CommonCiywModule} from "../../common/common-ciyw.module";
import {AppRoutingModule} from "../../../kernel/app-routing.module";
import {UserDialogModule} from "./dialogs/user-dialog/user-dialog.module";
import {AdminUsersModule} from "./admin-users/admin-users.module";

@NgModule({
  declarations: [
    AdminAreaComponent,
  ],
  imports: [
    AppRoutingModule,
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
    MatToolbarModule,
    MatIconModule,

    MatSortModule,
    CommonCiywModule,
    MatPaginatorModule,
    MatSelectModule,

    AdminUsersModule,
    UserDialogModule,
  ],
  exports: [
    AdminAreaComponent,
  ]
})
export class AdminAreaModule {}
