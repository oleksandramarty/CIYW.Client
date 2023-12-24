import {CommonModule} from "@angular/common";
import {LOCALE_ID, NgModule} from "@angular/core";
import {AppRoutingModule} from "../../kernel/app-routing.module";
import {BrowserModule} from "@angular/platform-browser";
import {AuthLoginComponent} from "./components/auth-login/auth-login.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {AuthComponent} from "./components/auth/auth.component";
import {AuthSignUpComponent} from "./components/auth-sign-up/auth-sign-up.component";
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    AuthComponent,
    AuthLoginComponent,
    AuthSignUpComponent,
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

    RouterModule
  ],
  exports: [
    AuthComponent,
    AuthLoginComponent,
    AuthSignUpComponent,
  ]
})
export class AuthModule {}
