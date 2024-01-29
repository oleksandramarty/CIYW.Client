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
import {PersonalAreaComponent} from "./personal-area/personal-area.component";
import {HomeComponent} from "./home/home.component";
import {MatSortModule} from "@angular/material/sort";
import {MatToolbarModule} from "@angular/material/toolbar";
import {CommonCiywModule} from "../../common/common-ciyw.module";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSelectModule} from "@angular/material/select";
import {CiywTableModule} from "../../ciyw-components/ciyw-table/ciyw-table.module";
import {InvoiceDialogModule} from "./dialogs/invoice-dialog/invoice-dialog.module";
import {AppRoutingModule} from "../../../kernel/app-routing.module";
import {InvoicesComponent} from "./invoices/invoices.component";
import {ChatModule} from "./chat/chat.module";

@NgModule({
  declarations: [
    PersonalAreaComponent,
    HomeComponent,
    InvoicesComponent,
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

    CiywTableModule,
    InvoiceDialogModule,
    ChatModule,
  ],
  exports: [
    PersonalAreaComponent,
    HomeComponent,
    InvoicesComponent,
  ]
})
export class PersonalAreaModule {}
