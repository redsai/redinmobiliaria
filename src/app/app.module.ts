import { BrowserModule } from '@angular/platform-browser';

/* Routing */
import { Routing } from './app-routing.module';

import { AppComponent } from './app.component';

/* Angular Material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

/* FormsModule */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Angular Flex Layout */
import { FlexLayoutModule } from "@angular/flex-layout";

/* Components */
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './Sections/home/home.component';
import { NavbarComponent } from './Sections/navbar/navbar.component';
import { FooterComponent } from './Sections/footer/footer.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatIconModule } from '@angular/material/icon';
import { HomePageIntroComponent } from './home-page-intro/home-page-intro.component';
import { NavComponent } from './nav/nav.component';
import { ProfileComponent } from './Sections/profile/profile.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentsShoppingComponent } from './comments/comments-shopping.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { ShoppingComponent } from './Sections/shopping/shopping.component';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { MomentModule } from 'ngx-moment';
import { SettingsComponent } from './Sections/settings/settings.component';
import { TerminosUsoComponent } from './terminos-uso/terminos-uso.component';
import { PoliticaPrivacidadComponent } from './politica-privacidad/politica-privacidad.component';
import { PoliticaUsoCookiesComponent } from './politica-uso-cookies/politica-uso-cookies.component';
import { ImagesComponent } from './Sections/images/images.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { PanelAdminComponent } from './panel-admin/panel-admin.component';
import { UserAcceptComponent } from './user-accept/user-accept.component';
import { OlvidastePasswordComponent } from './olvidaste-password/olvidaste-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { SpinnerModule } from './spinner/spinner.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    HomePageIntroComponent,
    NavComponent,
    ProfileComponent,
    CommentsComponent,
    UploadFileComponent,
    ShoppingComponent,
    CommentsShoppingComponent,
    SettingsComponent,
    ImagesComponent,
    TerminosUsoComponent,
    PoliticaPrivacidadComponent,
    PoliticaUsoCookiesComponent,
    LoginAdminComponent,
    PanelAdminComponent,
    UserAcceptComponent,
    OlvidastePasswordComponent,
    NewPasswordComponent
  ],
  imports: [    
    BrowserModule,
    Routing,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatIconModule,
    HttpClientModule,
    AngularFileUploaderModule,
    MatSnackBarModule,
    AutocompleteLibModule,
    MomentModule,
    NgbModule,
    MDBBootstrapModule,
    SpinnerModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }