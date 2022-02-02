import { Component, OnInit, NgModule } from '@angular/core';
import { Validators, FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-user-accept',
  templateUrl: './user-accept.component.html',
  styleUrls: ['./user-accept.component.scss'],
  
})
export class UserAcceptComponent implements OnInit {
  users: User;
  id: string ;
  constructor(private authService: AuthService, private _router: ActivatedRoute) {
    this.id = this._router.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.authService.getUser(this.id)
    .then((users: User) => {
      this.users = users;
    });
  }
  AceptarAgente(id: string){

    this.authService.putUserAdmitido(this.users, id)
    .subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'Usuario Aprobado',
          showConfirmButton: false,
          timer: 1500
        }),
        window.location.reload(),
        this.authService.handleError;
      }
    );
  }

}
