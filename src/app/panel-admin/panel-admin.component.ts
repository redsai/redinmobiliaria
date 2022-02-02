import { Component, OnInit, NgModule } from '@angular/core';
import { Validators, FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.scss'],
  
})
export class PanelAdminComponent implements OnInit {
  users: User[];
  users1: User;
  
  constructor(private authService: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.authService.getUserNew()
    .then((users: User[]) => {
      this.users = users;
    });

    if(!this.authService.isLoggedIn()){
      this.router.navigateByUrl('loginAdmin');
    }
  }
  AceptarAgente(id: string){
    this.authService.putUserAdmitido(this.users1, id)
    .subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'Usuario Aprobado',
          showConfirmButton: false,
          timer: 2500
        }),
        window.location.reload(),
        this.authService.handleError;
      }
    );
  }
  EliminarAgente(id: string){    
    Swal.fire({
      title: 'Estas seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, bórralo!'      
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.deleteUserAdmitido(id)        
          Swal.fire(
            'Eliminado!',
            'El usuario ha sido eliminado.',
            'success'
          ),
          window.location.reload(),
          this.authService.handleError;        
      }
    })
  }
}
