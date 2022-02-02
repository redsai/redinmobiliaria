import { Component, OnInit, NgModule } from '@angular/core';
import { Validators, FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-olvidaste-password',
  templateUrl: './olvidaste-password.component.html',
  styleUrls: ['./olvidaste-password.component.scss'],  
})
export class OlvidastePasswordComponent implements OnInit {

  myForm =  this.formBuilder.group({
    email: [null, [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    ]]
  });
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    
  }
  
  async onReset() {

    try{
      if (this.myForm.valid) {
        const { email } = this.myForm.value;
        await this.authService.getOlvidastePassword(email)
        
        Swal.fire({
          icon: 'success',
          title: 'Acabas de recibir un email para realizar el cambio de contraseña.',
          showConfirmButton: false,
          timer: 3500
        }),
        this.router.navigate(['/login']),
        
        this.authService.handleError;
      }
    }catch(error){
      console.log(error);
    }
  }

  getErrorMessage(field: string): string{
    let message;
    if(this.myForm.get(field).errors.required){
      message = 'Este campo no puede estar vacio';
    }else if(this.myForm.get(field).hasError('pattern')){
      message = 'Email no valido';
    }else if(this.myForm.get(field).hasError('minLength')){
      const minLength = this.myForm.get(field).errors?.minLength.requiredLength;
      message = `El tamaño minimo es de ${minLength} caracteres`;
    }
    return message;
  }

  isValidField( field: string): boolean{
    return ( ( this.myForm.get(field).touched || this.myForm.get(field).dirty) 
    && !this.myForm.get(field).valid
    );
  }
}
