import {CommonModule, NgOptimizedImage} from "@angular/common";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {CiywAvatarComponent} from "./ciyw-avatar.component";

@NgModule({
  declarations: [
    CiywAvatarComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    MatDialogModule,
    MatButtonModule,

    NgOptimizedImage
  ],
  exports: [
    CiywAvatarComponent,
  ]
})
export class CiywAvatarModule {}
