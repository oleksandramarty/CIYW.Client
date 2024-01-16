import {RouterModule, RouterOutlet, Routes} from "@angular/router";
import {PersonalAreaComponent} from "../modules/personal-area/personal-area/personal-area.component";
import {HomeComponent} from "../modules/personal-area/home/home.component";
import {AuthGuard} from "./guards/auth.guard";
import {NotFoundComponent} from "../modules/not-found/not-found/not-found.component";
import {NgModule} from "@angular/core";
import {AuthComponent} from "../modules/auth/components/auth/auth.component";
import {AuthLoginComponent} from "../modules/auth/components/auth-login/auth-login.component";
import {AuthSignUpComponent} from "../modules/auth/components/auth-sign-up/auth-sign-up.component";
import {AdminAreaComponent} from "../modules/admin-area/admin-area/admin-area.component";
import {AdminUsersComponent} from "../modules/admin-area/admin-users/admin-users.component";

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'auth/login', outlet: 'app-area'},
  {
    path: '',
    component: PersonalAreaComponent,
    outlet: 'personal-area',
    children: [
      {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
      // {path: '**', pathMatch: 'full', redirectTo: 'home'}
    ]
  },
  {
    path: 'admin',
    component: AdminAreaComponent,
    outlet: 'admin-area',
    children: [
      {path: 'users', component: AdminUsersComponent, canActivate: [AuthGuard]},
      // {path: '**', pathMatch: 'full', redirectTo: 'home'}
    ]
  },
  {
    path: 'auth',
    component: AuthComponent,
    outlet: 'auth-area',
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'login'},
      {path: 'login', component: AuthLoginComponent},
      {path: 'sign-in', component: AuthSignUpComponent},
      {path: '**', pathMatch: 'full', redirectTo: 'login'}
    ],
  },
  {path: 'not-found', component: NotFoundComponent, outlet: 'app-area'},
  {path: '**', pathMatch: 'full', redirectTo: 'auth'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, RouterOutlet],
})
export class AppRoutingModule {}
