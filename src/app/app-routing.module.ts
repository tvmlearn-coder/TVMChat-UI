import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login/login.component';
import { RegistrationComponent } from './components/login/registration/registration.component';
import { HamburgerMenuComponent } from './components/dashboard/hamburger-menu/hamburger-menu.component';
import { authGuard } from './auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';

const routes: Routes = [
  { path:'', component: LoginComponent},
  { path:'Register', component: RegistrationComponent},
  { path:'dashboard', component: DashboardComponent,  canActivate: [authGuard]} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
