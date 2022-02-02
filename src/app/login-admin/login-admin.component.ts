import { Component, OnInit, NgModule } from '@angular/core';
import { Validators, FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss'],
  
})
export class LoginAdminComponent implements OnInit {

  myForm =  this.formBuilder.group({
    email: [null, [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    ]],
    password: [null, 
      [Validators.required, 
      Validators.minLength(5)
    ]]
  });
  constructor(private authService: AuthService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    
  }
  
  onSubmit() {
    if (this.myForm.valid) {
      const { email, password } = this.myForm.value;
      const user = new User(email, password);
      this.authService.signinAdmin(user)
        .subscribe(
          this.authService.loginAdmin,
          this.authService.handleError
        );
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
