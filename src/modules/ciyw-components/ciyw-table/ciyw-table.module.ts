import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {CiywTableComponent} from "./ciyw-table.component";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {CiywPaginatorModule} from "../ciyw-paginator/ciyw-paginator.module";

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

    CiywPaginatorModule,

    RouterModule
  ],
  exports: [
    CiywTableComponent,
  ]
})
export class CiywTableModule {}
