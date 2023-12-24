import {RouterModule, Routes} from "@angular/router";
import {PersonalAreaComponent} from "../modules/personal-area/personal-area/personal-area.component";
import {HomeComponent} from "../modules/personal-area/home/home.component";
import {AuthGuard} from "./guards/auth.guard";
import {NotFoundComponent} from "../modules/not-found/not-found/not-found.component";
import {NgModule} from "@angular/core";
import {AuthComponent} from "../modules/auth/components/auth/auth.component";
import {AuthLoginComponent} from "../modules/auth/components/auth-login/auth-login.component";
import {AuthSignUpComponent} from "../modules/auth/components/auth-sign-up/auth-sign-up.component";

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'auth/login'},
  {
    path: '',
    component: PersonalAreaComponent,
    children: [
      {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
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
  exports: [RouterModule],
})
export class AppRoutingModule {}
