import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import urljoin from 'url-join';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Shopping } from '../models/shopping.model';
import { Departmens } from '../models/cities_departmens.model';
import { map } from 'rxjs/operators';
import 'rxjs/Rx';
import { pipe } from 'rxjs/Rx';
@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  shoppingysUrl: string;
  shoppingysBarriosUrl
  constructor(private http: HttpClient, private router: Router, public snackBar: MatSnackBar) {
    this.shoppingysUrl = urljoin(environment.apiUrl, 'shopping');
    this.shoppingysBarriosUrl = urljoin(environment.apiUrl, 'shopping/barrio');
  }
  getShoppings(): Promise<void | Shopping[]> {
    return this.http.get(this.shoppingysUrl)
              .toPromise()
              .then(response => response as Shopping[])
              .catch(this.handleError);
  }
  getsShoppings() {
    return this.http.get(this.shoppingysUrl);
  }

  getShoppingsBarrios(Barrio): Promise<void | Shopping[]> {
    const url = urljoin(this.shoppingysBarriosUrl, Barrio);
    return this.http.get(url)
      .toPromise()
      .then(response => response as Shopping[])
      .catch(this.handleError);
  }

  getShopping(id): Promise<void | Shopping> {
    const url = urljoin(this.shoppingysUrl, id);
    return this.http.get(url)
            .toPromise()
            .then(response => response as Shopping)
            .catch(this.handleError);
  }

  getToken() {
    const token = localStorage.getItem('token');
    return `?token=${token}`;
  }

  shopping(shopping: Shopping) {
    const body = JSON.stringify(shopping);
    let headers = new HttpHeaders();
    const token = this.getToken();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(this.shoppingysUrl + token, body, { headers })
    .pipe(
      map((response: any) => {
        this.shopping(response);
        return response;
      })
      /*.catch((error: Response) => {
        console.log(error);
        return Observable.throw(error.json());
      });*/
    )
  }
  /*getDepartamens(departmens: string ): Shopping[] {
    const depart = this.getsShoppings();
    const departs = depart.filter(item => item.Departamento == departmens)
    return departs;
  }*/

  showError(message) {
    this.snackBar.open(message, 'x', { duration: 2500 });
  }

  public handleError = (error: any) => {
    const { error: message } = error;
    if (name === 'TokenExpiredError') {
      this.showError('Tu sesión ha expirado');
    } else if (name === 'JsonWebTokenError') {
      this.showError('Ha habido un problema con tu sesión');
    } else {
      this.showError(message || 'Ha ocurrido un error. Inténtalo nuevamente');
    }
  }
}
