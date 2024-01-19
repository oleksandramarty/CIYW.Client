import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {CiywTableComponent} from "./ciyw-table.component";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {CiywPaginatorModule} from "../ciyw-paginator/ciyw-paginator.module";
import {MatIconModule} from "@angular/material/icon";
import {CiywConfirmDialogModule} from "../ciyw-confirm-dialog/ciyw-confirm-dialog.module";
import {CiywLoaderModule} from "../ciyw-loader/ciyw-loader.module";
import {UtilityCiywModule} from "../../common/utility-ciyw.module";
import {MatButtonModule} from "@angular/material/button";
import {CiywAvatarModule} from "../ciyw-avatar/ciyw-avatar.module";

@NgModule({
  declarations: [
    CiywTableComponent,
  ],
    imports: [
      CommonModule,
      BrowserModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,

      MatTableModule,
      MatSortModule,
      MatButtonModule,
      MatIconModule,

      CiywPaginatorModule,
      CiywConfirmDialogModule,

      CiywLoaderModule,
      UtilityCiywModule,
      CiywAvatarModule
    ],
  exports: [
    CiywTableComponent,
  ]
})
export class CiywTableModule {}
