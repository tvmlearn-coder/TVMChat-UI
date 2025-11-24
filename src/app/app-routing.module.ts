import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login/login.component';
import { authGuard } from './auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { ProfileSetupComponent } from './components/login/profile-setup/profile-setup.component';
import { SettingsComponent } from './components/dashboard/hamburger-menu/settings/settings.component';
import { ProfileComponent } from './components/dashboard/hamburger-menu/profile/profile.component';
import { AllChatComponent } from './components/dashboard/hamburger-menu/all-chat/all-chat.component';
import { StatusComponent } from './components/dashboard/hamburger-menu/status/status.component';
import { DummyAiComponent } from './components/dashboard/hamburger-menu/dummy-ai/dummy-ai.component';

const routes: Routes = [
  { path:'', component: LoginComponent},
  { path:'dashboard', component: DashboardComponent,  canActivate: [authGuard]},
  { path: 'profilesetup', component: ProfileSetupComponent },
  { path: 'Settings',component: SettingsComponent },
  { path: 'profile', component: ProfileComponent },
  {path:'all-chat',component:AllChatComponent},
  {path:'status',component:StatusComponent},
  {path:'dummy-ai',component:DummyAiComponent}
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
