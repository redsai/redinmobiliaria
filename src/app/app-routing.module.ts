import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './Sections/home/home.component';
import { HomePageIntroComponent } from './home-page-intro/home-page-intro.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './Sections/profile/profile.component';
import { CommentsComponent } from './comments/comments.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { CommentsShoppingComponent } from './comments/comments-shopping.component';
import { SettingsComponent } from './Sections/settings/settings.component';
import { ImagesComponent } from './Sections/images/images.component';
import { TerminosUsoComponent } from './terminos-uso/terminos-uso.component';
import { PoliticaPrivacidadComponent } from './politica-privacidad/politica-privacidad.component';
import { PoliticaUsoCookiesComponent } from './politica-uso-cookies/politica-uso-cookies.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { PanelAdminComponent } from './panel-admin/panel-admin.component';
import { UserAcceptComponent } from './user-accept/user-accept.component';
import { OlvidastePasswordComponent } from './olvidaste-password/olvidaste-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
const APP_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'homePage' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'homePage', component: HomePageIntroComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'comments', component: CommentsComponent },
  { path: 'CommentsShopping', component: CommentsShoppingComponent },
  { path: 'file', component: UploadFileComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'property/:id', component: ImagesComponent },
  { path: 'user/:id', component: UserAcceptComponent },
  { path: 'TerminosDeUso', component: TerminosUsoComponent},
  { path: 'PoliticaPrivacidad', component: PoliticaPrivacidadComponent},
  { path: 'PoliticaUsoCookies', component: PoliticaUsoCookiesComponent},
  { path: 'loginAdmin', component: LoginAdminComponent },
  { path: 'panelAdmin', component: PanelAdminComponent},
  { path: 'olvidastePassword', component: OlvidastePasswordComponent},
  { path: 'NewPassword/:id', component: NewPasswordComponent},
  { path: '**', component: PageNotFoundComponent }  
];

export const Routing = RouterModule.forRoot(APP_ROUTES);
//export class AppRoutingModule { }
