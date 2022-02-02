import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import urljoin from 'url-join';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Property } from '../models/property.model';
import { Comment } from '../models/comments.model';
import { User } from '../models/user.model';
import { CommentShopping } from '../models/commentsShopping.model';
import { map } from 'rxjs/operators';
import 'rxjs/Rx';
import { pipe } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  propertysUrl: string;
  shoppingsUrl: string;
  propertysUserUrl: string;
  propertysBarriosUrl: string;
  constructor(private http: HttpClient, private router: Router, public snackBar: MatSnackBar) { 
    this.propertysUrl = urljoin(environment.apiUrl, 'property');
    this.propertysBarriosUrl = urljoin(environment.apiUrl, 'property/barrio');
    this.propertysUserUrl = urljoin(environment.apiUrl, 'property/user');
    this.shoppingsUrl = urljoin(environment.apiUrl, 'shopping');
  }
  public selectProperty: Property = {
    _id: null,
    NombreInmueble: '',
    DescripcionInmueble: '',
    Precio: '',
    TipoOferta: '',
    TipoInmueble: '',
    Departamento: {
      id: null,
      name: '',
    },
    Ciudad: {
      id: null,
      DepartmensId: null,
      name: ''
    },
    Barrio: {
      CitiesId: null,
      name: '',
    },
    Banios: '',
    Habitaciones: '',
    Garaje: '',
    Asensor: ''
  }
  upload(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);    
    const req = new HttpRequest('POST', `${this.propertysUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.propertysUrl}/files`);
  }

  getPropertys(): Promise<void | Property[]> {
    return this.http.get(this.propertysUrl)
              .toPromise()
              .then(response => response as Property[])
              .catch(this.handleError);
  }

  getProperty(id): Promise<void | Property> {
    const url = urljoin(this.propertysUrl, id);
    return this.http.get(url)
            .toPromise()
            .then(response => response as Property)
            .catch(this.handleError);
  }
  getPropertyBarrios(Barrio): Promise<void | Property[]> {
    const url = urljoin(this.propertysBarriosUrl, Barrio);
    return this.http.get(url)
      .toPromise()
      .then(response => response as Property[])
      .catch(this.handleError);
  }
  deleteProperty(id) {
    const idString = id.toString();
    const url = urljoin(this.propertysUrl, idString);
    const token = this.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    //return this.http.put(url + token, { headers })
    return this.http.delete(url + token, { headers } )
      .toPromise()
      .then(response => response as Property)
      .catch(this.handleError);
  }
  getPropertyUser(id): Promise<void | Property[]> {
    const url = urljoin(this.propertysUserUrl , id);
    return this.http.get(url)
            .toPromise()
            .then(response => response as Property[])
            .catch(this.handleError);
  }

  getToken() {
    const token = localStorage.getItem('token');
    return `?token=${token}`;
  }

  property(property: Property) {
    //console.log(property);
    //const body = JSON.stringify(property);
    const fd = new FormData();
    fd.append('NombreInmueble', property.NombreInmueble);
    fd.append('DescripcionInmueble', property.DescripcionInmueble);
    fd.append('Precio', property.Precio);
    fd.append('TipoOferta', property.TipoOferta);
    fd.append('TipoInmueble', property.TipoInmueble);
    fd.append('Banios', property.Banios);
    fd.append('Habitaciones', property.Habitaciones);
    fd.append('Garaje', property.Garaje);
    fd.append('Asensor', property.Asensor);
    fd.append('Departamento', property.Departamento.name);
    fd.append('Ciudad', property.Ciudad.name);
    fd.append('Barrio', property.Barrio.name);
    const imageArr = Array.from(property.Images);
    imageArr.forEach(image => {
      fd.append('image', image);    
      
    });
    const token = this.getToken();
    return this.http.post(this.propertysUrl + token, fd )
      .pipe(
      map((response: any) => {
        //this.property(response);
        return response;
      })
      /*.catch((error: Response) => {
        console.log('error->>> '+error);
        return Observable.throw(error.json());
      });*/
      )
  }
  putProperty(_id: string, NombreInmueble: string, DescripcionInmueble: string, Precio: string,
    Departamento: string, Ciudad: string, Barrio: string, Banios: string, Habitaciones: string, Garaje: string, Asensor: string) {
    const formd = new FormData();
    formd.append('NombreInmueble', NombreInmueble);
    formd.append('DescripcionInmueble', DescripcionInmueble);
    formd.append('Precio', Precio);
    formd.append('Banios', Banios);
    formd.append('Habitaciones', Habitaciones);
    formd.append('Garaje', Garaje);
    formd.append('Asensor', Asensor);
    formd.append('Departamento', Departamento);
    formd.append('Ciudad', Ciudad);
    formd.append('Barrio', Barrio);
    var convertedJSON = {};
    formd.forEach(function(value, key) { 
      convertedJSON[key] = value;
    });
    var json = JSON.stringify(convertedJSON);
    const url = urljoin(this.propertysUrl, _id);
    const token = this.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.put(url + token, json, { headers })
    .pipe(
    map((response: any) => {
      console.log('response-> '+JSON.stringify(response))
      //this.property(response);
      return response;
    })
    )
  }
  addComment(comment: Comment) {
    const a = {
      descripcion: comment.descripcion,
      property: {
        _id: comment.property._id
      }
    };
    const body = JSON.stringify(a);
    const idString = comment.property._id.toString();
    const url = urljoin(this.propertysUrl, idString, 'comment');
    let headers = new HttpHeaders();
    const token = this.getToken();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(url + token, body, { headers })
    .pipe(
    map((response: any) => {
      console.log('response-> '+response)
      //this.property(response);
      return response;
    })
    )
  }

  addCommentShopping(comment: CommentShopping) {
    const a = {
      descripcion: comment.descripcion,
      shopping: {
        _id: comment.shopping._id
      }
    };
    const body = JSON.stringify(a);
    const idString = comment.shopping._id.toString();
    const url = urljoin(this.shoppingsUrl, idString, 'comment');
    let headers = new HttpHeaders();
    const token = this.getToken();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(url + token, body, { headers })
    .pipe(
    map((response: any) => {
      //this.property(response);
      return response;
    }),
    /*catch((error: Response) => {
      console.log(error);
      return Observable.throw(error.json());
    });*/
    )
  }

  showError(message) {
    this.snackBar.open(message, 'x', { duration: 2500 });
  }

  public handleError = (error: any) => {
    const { error: message } = error;
    /*if (name === 'TokenExpiredError') {
      this.showError('Tu sesión ha expirado');
    } else if (name === 'JsonWebTokenError') {
      this.showError('Ha habido un problema con tu sesión');
    } else {
      this.showError(message || 'Ha ocurrido un error. Inténtalo nuevamente');
    }*/
  }
}
