import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {CiywPaginatorComponent} from "./ciyw-paginator.component";
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  declarations: [
    CiywPaginatorComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    MatPaginatorModule,

    RouterModule
  ],
  exports: [
    CiywPaginatorComponent,
  ]
})
export class CiywPaginatorModule {}
