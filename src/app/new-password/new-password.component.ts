import { Component, OnInit, NgModule } from '@angular/core';
import { Validators, FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],  
})
export class NewPasswordComponent implements OnInit {
  id: any ;
  myForm =  this.formBuilder.group({
    password: [null, [
      Validators.required
    ]]
  });
  constructor(private authService: AuthService, 
    private formBuilder: FormBuilder, 
    private router: Router,
    private _router: ActivatedRoute) 
  {
    this.id = this._router.snapshot.paramMap.get('id');
    this.id = this.id.split('-');
    
  }

  ngOnInit() {
    
  }
  
  async onReset() {

    try{
      if (this.myForm.valid) {
        const { password } = this.myForm.value;
        console.log(password)
        console.log(this.id[1])
        console.log(this.id[0])
        
        await this.authService.putNewPassword(this.id[0], password, this.id[1])
        this.router.navigate(['/login']);        
        this.authService.handleError      
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
