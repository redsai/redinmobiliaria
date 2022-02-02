import { Injectable } from '@angular/core';

import urljoin from 'url-join';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import 'rxjs/Rx';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usersUrl: string;
  olvidastePassword: string;
  currentUser: User;
  userUrl: string;
  userPutUrl: string;
  userPutPasswordUrl: string;
  userPutUrlAdmitido: string;
  userDeleteUrl: string;
  NewPassword: string;

  HttpHeaders = new HttpHeaders();


  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {
    this.usersUrl = urljoin(environment.apiUrl, 'auth');
    this.userUrl = urljoin(environment.apiUrl, 'user');
    this.userPutUrl = urljoin(environment.apiUrl, 'auth/putUser');
    this.userPutPasswordUrl = urljoin(environment.apiUrl, 'auth/putUserPassword');
    this.userPutUrlAdmitido = urljoin(environment.apiUrl, 'auth/putUser/Admitido');
    this.userDeleteUrl = urljoin(environment.apiUrl, 'auth/deleteUser');
    this.olvidastePassword = urljoin(environment.apiUrl, 'auth/olvidastePassword');
    this.NewPassword = urljoin(environment.apiUrl, 'auth/new-password');
    if (this.isLoggedIn()) {
      const { userId, email, nombres, apellidos, celular, fechaNacimiento, sexo } = JSON.parse(localStorage.getItem('user'));
      
      this.currentUser = new User(email, null, nombres, apellidos, celular, fechaNacimiento , sexo, userId);
    }
    
  }

  signup(user: User) {
    const body = JSON.stringify(user);
    const fd = new FormData();
    fd.append('email', user.email);
    fd.append('password', user.password);
    fd.append('nombres', user.nombres);
    fd.append('apellidos', user.apellidos);
    fd.append('celular', user.celular);
    fd.append('fechaNacimiento', user.fechaNacimiento);
    fd.append('sexo', user.sexo);
    fd.append('foto', user.foto);
    fd.append('cedula', user.cedula);
    fd.append('Ciudad', user.Ciudad.name);
    fd.append('PerfilFacebook', user.PerfilFacebook);
    fd.append('NombreEmpresa', user.NombreEmpresa);
    fd.append('NitEmpresa', user.NitEmpresa);
    fd.append('inmobiliarioIndep', user.inmobiliarioIndep);
    fd.append('aniosInmobiliario', user.aniosInmobiliario);
    fd.append('tarjetaPresntacion', user.tarjetaPresntacion);
    fd.append('brochureEmpresarial', user.brochureEmpresarial);
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(urljoin(this.usersUrl, 'signup'), fd) 
    .pipe(   
      map((response: any) => {        
        return response;
      }),
      catchError(err => {
        console.log('caught rethrown error, providing fallback value');
            return throwError(err);
      })
      /*.catch((error: Response) => {
        console.log(error);
        return Observable.throw(error);
      });*/
    )
  }
  getToken() {
    const token = localStorage.getItem('token');
    return `?token=${token}`;
  }

  putUser(nombres: any, apellidos: any, email: any, celular: any, id: any) {
    const formd = new FormData();
    formd.append('nombres', nombres);
    formd.append('apellidos', apellidos);
    formd.append('email', email);
    formd.append('celular', celular);

    var convertedJSON = {};
    formd.forEach(function(value, key) { 
      convertedJSON[key] = value;
    });
    var json = JSON.stringify(convertedJSON);
    //const body = JSON.stringify(user);
    let headers = new HttpHeaders();
    const token = this.getToken();
    const idString = id.toString();
    const url = urljoin(this.userPutUrl, idString);
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.put(urljoin(url + token), json, { headers })
      .pipe(
        map((response: any) => {        
          return response;
        }),
        catchError(err => {
          console.log('caught rethrown error, providing fallback value');
              return throwError(err);
        })
      )
  }

  putUserPassword(current_password: any, new_password: any, confirm_new_password: any, id: any) {
    //const body = JSON.stringify(user);
    const formd = new FormData();
    formd.append('current_password', current_password);
    formd.append('new_password', new_password);
    formd.append('confirm_new_password', confirm_new_password);

    var convertedJSON = {};
    formd.forEach(function(value, key) { 
      convertedJSON[key] = value;
    });
    var json = JSON.stringify(convertedJSON);
    let headers = new HttpHeaders();
    const token = this.getToken();
    const idString = id.toString();
    const url = urljoin(this.userPutPasswordUrl, idString);
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.put(urljoin(url + token), json, { headers })
    .pipe(   
      map((response: any) => {        
        return response;
      }),
      catchError(err => {
        console.log('caught rethrown error, providing fallback value');
            return throwError(err);
      })
      /*.catch((error: Response) => {
        console.log(error);
        return Observable.throw(error);
      });*/
    )
  }
  putUserAdmitido(user: User, id: any) {
    const body = JSON.stringify(user);
    const idString = id.toString();
    const url = urljoin(this.userPutUrlAdmitido, idString);
    return this.http.put(url, body)
    .pipe(
      map((response: any) => {
        this.loginAdmin(response);
        return response;
      })
    )
  }

  deleteUserAdmitido(id) {
    //const idString = id.toString();
    const token = this.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const url = urljoin(this.userDeleteUrl, id);  
    return this.http.delete(url + token, { headers })
    .toPromise()
    .then(response => response as User)
    .catch(this.handleError);
  }
  getUsers(): Promise<void | User[]> {
    return this.http.get(this.usersUrl)
              .toPromise()
              .then(response => response as User[])
              .catch(this.handleError);
  }

  getUser(id: any): Promise<void | User> {
    const idString = id.toString();
    const url = urljoin(this.usersUrl, idString);
    return this.http.get(url)
            .toPromise()
            .then(response => response as User)
            .catch(this.handleError);
  }

  getOlvidastePassword(email: any) {
    const idString = email.toString();

    const url = urljoin(this.olvidastePassword, idString);
    return this.http.get(url)
    
    .toPromise()
    .then(response => response)
    .catch(this.handleError);
    
  }

  putNewPassword(id: any, password: any, token1: string) {

    const formd = new FormData();
    formd.append('password', password);

    var convertedJSON = {};
    formd.forEach(function(value, key) { 
      convertedJSON[key] = value;
    });
    var json = JSON.stringify(convertedJSON);

    const idString = id.toString();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Authorization', 'Bearer '+token1);
    const url = urljoin(this.NewPassword, idString);

    console.log("body: "+json)
    return this.http.put(url, json, { headers })
    .toPromise()
    .then(response => response)
    .catch(this.handleError);
  }

  getUserNew(): Promise<void | User[]> {    
    const url = urljoin(this.usersUrl, 'admin/Admitidos');
    return this.http.get(url)
              .toPromise()
              .then(response => response as User[])
              .catch(this.handleError);
  }

  signin(user: User) {
    const body = JSON.stringify(user);
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(urljoin(this.usersUrl, 'signin'), body, { headers })
    .pipe(
      map((response: any) => {   
        console.log(response)     
        return response;
      }),
      catchError(err => {
        console.log('caught rethrown error, providing fallback value');
            return throwError(err);
      })
    )  
  }

  signinAdmin(user: User) {
    const body = JSON.stringify(user);
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(urljoin(this.usersUrl, 'signinAdmin'), body, { headers })
    .pipe(
      map((response: any) => {        
        console.log(response)
        return response;
        
      }),
      catchError(err => {
        console.log('caught rethrown error, providing fallback value');
            return throwError(err);
      })
    )      
  }

  login = ({ token, email, nombres, apellidos, celular, fechaNacimiento, sexo, userId}) => {
    this.currentUser = new User(email, null, nombres, apellidos, celular, fechaNacimiento, sexo, userId);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({  email, nombres, apellidos, celular, fechaNacimiento, sexo, userId }));    
    this.router.navigateByUrl('/home');
  }
  loginAdmin = ({ token, email, userId}) => {
    this.currentUser = new User(email, null, userId);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({  email, userId }));
    this.router.navigateByUrl('/panelAdmin');
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  logout() {
    localStorage.clear();
    this.currentUser = null;
    this.router.navigateByUrl('/login');
  }

  showError(message: any) {
    this.snackBar.open(message, 'x', { duration: 2500 });
  }

  public handleError = (err) => {
    const { err: message } = err;
    if (err === 'TokenExpiredError') {
      this.showError('Tu sesión ha expirado');
    } else if (err === 'JsonWebTokenError') {
      this.showError('Ha habido un problema con tu sesión');
    } else {
      this.showError(message || 'Ha ocurrido un error. Inténtalo nuevamente');
    }
    this.logout();
  }
}