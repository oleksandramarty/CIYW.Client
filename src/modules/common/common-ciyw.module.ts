import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {RemoveDashesPipe} from "../../kernel/pipes/remove-dashes.pipe";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,

    RemoveDashesPipe,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    MatToolbarModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,

    RemoveDashesPipe,
  ]
})
export class CommonCiywModule {}
