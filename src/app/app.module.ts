import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { WebsocketModule } from './websocket/websocket.module';
import { LoginComponent } from './components/login/login/login.component';
import { RegistrationComponent } from './components/login/registration/registration.component';
import { ProfileSetupComponent } from './components/login/profile-setup/profile-setup.component';
import { HamburgerMenuComponent } from './components/dashboard/hamburger-menu/hamburger-menu.component';
import { AllChatComponent } from './components/dashboard/hamburger-menu/all-chat/all-chat.component';
import { StatusComponent } from './components/dashboard/hamburger-menu/status/status.component';
import { DummyAiComponent } from './components/dashboard/hamburger-menu/dummy-ai/dummy-ai.component';
import { SettingsComponent } from './components/dashboard/hamburger-menu/settings/settings.component';
import { ProfileComponent } from './components/dashboard/hamburger-menu/profile/profile.component';
import { ChatListComponent } from './components/dashboard/chat-list/chat-list.component';
import { ChatLogoComponent } from './components/dashboard/chat-list/chat-logo/chat-logo.component';
import { ChatFilterComponent } from './components/dashboard/chat-list/chat-filter/chat-filter.component';
import { SearchBoxComponent } from './components/dashboard/chat-list/search-box/search-box.component';
import { UserListComponent } from './components/dashboard/chat-list/user-list/user-list.component';
import { ChatBoxComponent } from './components/dashboard/chat-box/chat-box.component';
import { ChatHeaderComponent } from './components/dashboard/chat-box/chat-header/chat-header.component';
import { ChatMainComponent } from './components/dashboard/chat-box/chat-main/chat-main.component';
import { ChatFooterComponent } from './components/dashboard/chat-box/chat-footer/chat-footer.component';
import { InterceptorInterceptor } from './interceptor.interceptor';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { ToastComponent } from './components/toast/toast.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileSetupComponent,
    HamburgerMenuComponent,
    AllChatComponent,
    StatusComponent,
    DummyAiComponent,
    SettingsComponent,
    ProfileComponent,
    ChatListComponent,
    ChatLogoComponent,
    ChatFilterComponent,
    SearchBoxComponent,
    UserListComponent,
    ChatBoxComponent,
    ChatHeaderComponent,
    ChatMainComponent,
    ChatFooterComponent,
    DashboardComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    WebsocketModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
