import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup  } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  myForm: FormGroup;
  myFormPassword: FormGroup;
  users: User;
  newPassword: Boolean = true;
  loading = true;
  constructor(private authService: AuthService,
              private router: Router
  ) { }

  ngOnInit(): void {
    if(!this.authService.isLoggedIn()){
      this.router.navigateByUrl('login');
    }
    console.log(this.authService.currentUser.nombres)
    this.authService.getUser(this.authService.currentUser.foto)
    
    .then((users: User) => {
      console.log(users.nombres);
      this.users = users;
      this.loading = false;
    });
    this.myForm = new FormGroup({
      nombres: new FormControl(null, Validators.required),
      apellidos: new FormControl(null, Validators.required),
      celular: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ])
    });
    
    this.myFormPassword = new FormGroup({
      current_password: new FormControl(null, Validators.required),
      new_password: new FormControl(null, Validators.required),
      confirm_new_password: new FormControl(null, Validators.required),     
    });
  }
  onSubmit() {
    const _id = this.users._id;
    console.log("11111-> "+this.users._id)
    if (this.myForm.valid) {
      const { nombres, apellidos, email, celular } = this.myForm.value;

      //const user = new User(nombres, apellidos, email, celular );
      this.authService.putUser(nombres, apellidos, email, celular, _id)
        .subscribe(
          res => {
            Swal.fire({
              icon: 'success',
              title: 'Usuario actualizado',
              showConfirmButton: false,
              timer: 3500
            }),
          window.location.reload(),
          this.authService.handleError
          }, 
          error => {
            Swal.fire({
              icon: 'error',
              title: 'No se pudo actualizar usuario',
              showConfirmButton: false,
              timer: 2500
            }),   
            window.location.reload()        
            //this.correoElec = false;
            //this.errorMessage = error;
          }
        );
    }
  }
  onSubmitPass() {

    

    const _id = this.users._id;
    console.log("11111-> "+this.users._id)
    if (this.myFormPassword.valid) {
      const { current_password, new_password, confirm_new_password } = this.myFormPassword.value;
      console.log("current_password: "+current_password);

      if(current_password==new_password){
        Swal.fire({
          icon: 'error',
          title: 'La contraseña actual y la nueva contraseña son iguales',
          showConfirmButton: false,
          timer: 2500
        }),
        window.location.reload() 

      }else if(new_password==confirm_new_password){

      //const user = new User(current_password, new_password, confirm_new_password );
      this.authService.putUserPassword(current_password, new_password, confirm_new_password, _id)
        .subscribe(
          res => {
            Swal.fire({
              icon: 'success',
              title: 'Contraseña actualizada',
              showConfirmButton: false,
              timer: 2500
            }),
          window.location.reload(),
          this.authService.handleError
          }, 
          error => {
            Swal.fire({
              icon: 'error',
              title: 'La contraseña actual no coincide',
              showConfirmButton: false,
              timer: 2500
            }),   
            window.location.reload()        
            //this.correoElec = false;
            //this.errorMessage = error;
          }
        );
      }else {
        Swal.fire({
          icon: 'error',
          title: 'Nueva contraseña y confirmación no coinciden',
          showConfirmButton: false,
          timer: 2500
        }),
        window.location.reload() 
        this.newPassword = false;
      }
    }
  }
}
