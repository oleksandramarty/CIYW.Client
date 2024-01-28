import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AuthLoginComponent} from "./auth-login/auth-login.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {AuthComponent} from "./auth/auth.component";
import {AuthSignUpComponent} from "./auth-sign-up/auth-sign-up.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {AppRoutingModule} from "../../../kernel/app-routing.module";
import {CiywFormGroupModule} from "../../ciyw-components/ciyw-form-group/ciyw-form-group.module";

@NgModule({
  declarations: [
    AuthComponent,
    AuthLoginComponent,
    AuthSignUpComponent,
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

    CiywFormGroupModule,
  ],
  exports: [
    AuthComponent,
    AuthLoginComponent,
    AuthSignUpComponent,
  ]
})
export class AuthModule {}
