import {RouterModule, RouterOutlet, Routes} from "@angular/router";
import {PersonalAreaComponent} from "../modules/areas/personal-area/personal-area/personal-area.component";
import {HomeComponent} from "../modules/areas/personal-area/home/home.component";
import {AuthGuard} from "./guards/auth.guard";
import {NotFoundComponent} from "../modules/not-found/not-found/not-found.component";
import {NgModule} from "@angular/core";
import {AuthComponent} from "../modules/areas/auth-area/auth/auth.component";
import {AuthLoginComponent} from "../modules/areas/auth-area/auth-login/auth-login.component";
import {AuthSignUpComponent} from "../modules/areas/auth-area/auth-sign-up/auth-sign-up.component";
import {AdminAreaComponent} from "../modules/areas/admin-area/admin-area/admin-area.component";
import {AdminUsersComponent} from "../modules/areas/admin-area/admin-users/admin-users.component";
import {InvoicesComponent} from "../modules/areas/personal-area/invoices/invoices.component";

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'auth/login'},
  {
    path: '',
    component: PersonalAreaComponent,
    children: [
      {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
      {path: 'invoices', component: InvoicesComponent, canActivate: [AuthGuard]},
      // {path: '**', pathMatch: 'full', redirectTo: 'home'}
    ]
  },
  {
    path: 'admin',
    component: AdminAreaComponent,
    children: [
      {path: 'users', component: AdminUsersComponent, canActivate: [AuthGuard]},
      // {path: '**', pathMatch: 'full', redirectTo: 'home'}
    ]
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'login'},
      {path: 'login', component: AuthLoginComponent},
      {path: 'sign-in', component: AuthSignUpComponent},
      {path: '**', pathMatch: 'full', redirectTo: 'login'}
    ],
  },
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'auth'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, RouterOutlet],
})
export class AppRoutingModule {}
