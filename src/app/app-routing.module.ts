import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from './helpers/AuthGuard';


const routes: Routes = [
  {  path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {  path: 'login', component: LoginComponent, },
  
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
